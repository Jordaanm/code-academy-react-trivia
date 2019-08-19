import * as React from 'react';
import "../styles/counter.scss";

interface CounterProps {
    value: number;
    initial: number;
}

interface CounterState {
    current: number;
}

export class Counter extends React.Component<CounterProps, CounterState> {
    public static defaultProps: Partial<CounterProps> = {
        initial: 0
    };
    
    private interval: any;

    public constructor(props: CounterProps) {
        super(props);


        this.state = {
            current: props.initial
        };

        if (props.initial < props.value) {
            this.startTimer();
        }
    }

    private startTimer() {
        this.interval = setInterval(() => {
            const newValue = this.state.current + 1;
            this.setState({
                current: newValue
            }, () => {
                if (newValue === this.props.value) {
                    clearInterval(this.interval);
                }
            });
        }, 250);
    }

    public render() {
        const { current } = this.state;
        const { initial } = this.props;
        const animate = current !== initial;
        const prev = animate ? current - 1 : '';

        return (
            <div className="mask">
                <div className={`counter ${animate?'':'no-anim'}`} data-prev={prev}>
                    {current}
                </div>
            </div>
        );
    }

}