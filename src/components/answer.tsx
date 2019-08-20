import * as React from 'react';
import { TriviaQuestion } from '../types';

import "../styles/answer.scss";

interface AnswerProps {
    question: TriviaQuestion,
    answer: string;
    isSelected: boolean;
    selectAnswer: (question: TriviaQuestion, answer: string) => void;
}

export const Answer: React.FC<AnswerProps> = (props: AnswerProps) => {
    const { question, answer, selectAnswer, isSelected } = props;
    return (
        <div className="answer row" key={answer} onClick={() => selectAnswer(question, answer)} >
            <span className={`checkbox ${isSelected ? 'answered' : ''}`}></span>
            {answer}
        </div>
    )
}