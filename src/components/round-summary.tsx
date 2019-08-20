import * as React from 'react';

import { QuestionResult } from '../types';
import { Counter } from './counter';


import "../styles/round-summary.scss";
interface RoundSummaryProps {
    score: number;
    total: number;
    answers: Map<string, QuestionResult>;
    playAgain: () => void;
}

export class RoundSummary extends React.Component<RoundSummaryProps> {

    public render() {
        const { score, total, playAgain, answers } = this.props;
        const results = Array.from(answers.values());
        return (
            <div className="round-summary">
                <div className="result-grid">
                    <div className="headers row">
                        <div className="result__question">Question</div>
                        <div className="result__given">Your Answer</div>
                        <div className="result__correct">Correct Answer</div>
                    </div>
                    {results.map((result: QuestionResult) => (
                        <div key={result.question} className="result row">
                            <div className="result__question">{result.question}</div>
                            <div className="result__given">{result.givenAnswer}</div>
                            <div className="result__correct">{result.correctAnswer}</div>
                        </div>
                    ))}
                </div>
                <div className="label row">Final Score</div>
                <div className="scoring row">
                    <Counter value={score} initial={0} />
                    <span>/</span>
                    <Counter value={total} initial={total} />
                </div>
                <div className="actions row">
                    <button className="action" onClick={playAgain}>
                        Play Again
                    </button>
                </div>
            </div>
        );
    }
}