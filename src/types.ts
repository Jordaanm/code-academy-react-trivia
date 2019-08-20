export interface Category {
    id: number;
    name: string;
}

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export interface TriviaQuestion {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    all_answers: string[]
}

export interface QuestionResult {
    question: string;
    correctAnswer: string;
    givenAnswer: string;
}