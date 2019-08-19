import * as React from 'react';
import { TriviaQuestion } from '../types';
import { observer } from 'mobx-react';

interface QuestionProps {
    triviaQuestion: TriviaQuestion;
    submitAnswer: (question: TriviaQuestion, answer: string) => void;
    givenAnswer?: string;
    index: number;
}

@observer
export class Question extends React.Component<QuestionProps> {
   
    public render() {
        const { triviaQuestion, submitAnswer, givenAnswer, index } = this.props;
        const { question, correct_answer, difficulty, all_answers } = triviaQuestion;
        const isCorrect = givenAnswer === correct_answer;

        const answeredClass = givenAnswer ? 'answered' : '' ;
        const correctClass = givenAnswer ? (isCorrect ? 'answered--correct' : 'answered--incorrect') : '';

        return (<article className={`question ${answeredClass} ${correctClass}`}>
            <div className="question-title glass">
                <h3>Question #{index}: {question}</h3>
                <div className="inner"></div>
            </div>
            <h4 className="question-difficulty">Difficulty: {difficulty}</h4>
            
            <form className="question-answers">
                {all_answers.map(answer =>
                    <label className={`glass ${givenAnswer ? (answer === correct_answer ? 'correct' : 'incorrect') : ''}`} key={answer} onClick={() => submitAnswer(triviaQuestion, answer)} >
                        <input type="radio" value={answer} checked={givenAnswer === answer} />
                        <span>{answer} {answer === givenAnswer ? (isCorrect ? '✅' : '❎'): ''}</span>
                        <div className="inner"></div>
                    </label>
                )}
            </form>

        </article>);
    }
}