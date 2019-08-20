import * as React from 'react';
import { TriviaQuestion } from '../types';
import { observer } from 'mobx-react';

interface QuestionProps {
    triviaQuestion: TriviaQuestion;
    selectAnswer: (question: TriviaQuestion, answer: string) => void;
    givenAnswer?: string;
    index: number;
}

@observer
export class Question extends React.Component<QuestionProps> {
   
    public render() {
        const { triviaQuestion, selectAnswer, givenAnswer, index } = this.props;
        const { question, difficulty, all_answers } = triviaQuestion;

        return (<article className={`question`}>
            <div className="question-title">
                <h3>Question #{index}: {question}</h3>
            </div>
            <h4 className="question-difficulty">Difficulty: {difficulty}</h4>
            
            <form className="question-answers">
                {all_answers.map(answer =>
                    <div className="answer row" key={answer} onClick={() => selectAnswer(triviaQuestion, answer)} >
                        <span className={`checkbox ${givenAnswer === answer ? 'answered' : ''}`}></span>
                        {answer}
                    </div>
                )}
            </form>

        </article>);
    }
}