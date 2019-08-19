import * as React from 'react';
import { Counter } from './counter';

import "../styles/round-summary.scss";

interface RoundSummaryProps {
    score: number;
    total: number;
    playAgain: () => void;
}

export class RoundSummary extends React.Component<RoundSummaryProps> {

    public render() {
        const { score, total, playAgain } = this.props;
        return (
            <div className="round-summary">
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