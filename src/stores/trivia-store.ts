import { observable, computed } from 'mobx';

import { trivia_categories } from './category-data.json';
import { Category, TriviaQuestion } from '../types';

export class TriviaStore {
    public static CATEGORIES_ENDPOINT: string = 'https://opentdb.com/api_category.php';
    

    public generateApiUrl(categoryId: string, amount: number = 5): string {
        return `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=multiple&encode=base64`;
    }

    /*************
     * Categories
     ************/
    @observable
    public isLoadingCategories: boolean = false;

    @observable
    public categories: Category[] = trivia_categories;

    public async fetchCategories() {
        this.isLoadingCategories = true;
        const response = await fetch(TriviaStore.CATEGORIES_ENDPOINT);
        const data = await response.json();
        this.categories = data.trivia_categories as Category[];
        this.isLoadingCategories = false;
        return this.categories;
    }

    /*************
     * Questions
     ************/

    @observable
    public isLoadingQuestions: boolean = false;

    @observable
    public currentQuestions?: TriviaQuestion[];

    public async fetchQuestions(id: string) {
        this.isLoadingQuestions = true;
        const url = this.generateApiUrl(id);
        const response = await fetch(url);
        const data = await response.json();
        const decoded = data.results.map((x: TriviaQuestion) => this.decodeTriviaQuestion(x));
        const decodedWithAnswers = decoded.map((x: TriviaQuestion) => this.appendRandomisedAnswers(x));
        this.currentQuestions = decodedWithAnswers;
        this.isLoadingQuestions = false;

        return this.currentQuestions;
    }

    decodeTriviaQuestion(tq: TriviaQuestion): TriviaQuestion {
        return {
            ...tq,
            question: atob(tq.question),
            difficulty: atob(tq.difficulty),
            correct_answer: atob(tq.correct_answer),
            incorrect_answers: tq.incorrect_answers.map(atob),
        };
    }

    appendRandomisedAnswers(tq: TriviaQuestion): TriviaQuestion {
        return {
            ...tq,
            all_answers: [...tq.incorrect_answers, tq.correct_answer].sort(x => Math.floor(Math.random() * 3) - 1)
        };
    }


    /*************
     * Answers
    ************/

    @observable
    public submittedAnswers: Map<string, string> = new Map();

    @computed
    public get correctAnswers(): number {
        if(!this.currentQuestions) {
            return 0;
        }

        return this.currentQuestions.filter(question => {
            const answer = this.submittedAnswers.get(question.question);
            return answer === question.correct_answer;
        }).length || 0;
    };

    @observable
    public questionIndex: number = 0;

    @observable
    public hasRoundStarted: boolean = false;


    public submitAnswer(question: TriviaQuestion, answer: string) {
        this.submittedAnswers.set(question.question, answer);
    }

    public nextQuestion() {
        if (!this.currentQuestions || this.questionIndex >= (this.currentQuestions.length - 1)) {
            this.endRound();
        } else {
            this.questionIndex += 1;
        }
    }

    public startRound() {
        this.questionIndex = 0;
        this.submittedAnswers.clear();
        this.hasRoundStarted = true;
    }

    public endRound() {
        this.hasRoundStarted = false;
    }

}