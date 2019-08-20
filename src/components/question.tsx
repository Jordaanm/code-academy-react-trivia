import * as React from 'react';
import { observer } from 'mobx-react';

import { TriviaQuestion } from '../types';
import { Answer } from './answer';

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
            
            <section className="question-answers">
                {all_answers.map(answer =>
                    <Answer
                        question={triviaQuestion}
                        answer={answer}
                        isSelected={givenAnswer === answer}
                        selectAnswer={selectAnswer}
                    />
                )}
            </section>

        </article>);
    }
}