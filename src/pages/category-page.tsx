import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { PageLayout } from './page';
import { TriviaStore } from '../stores/trivia-store';
import { Question } from '../components/question';

import "../styles/category-page.scss";
import { TriviaQuestion } from '../types';
import { LoadingThrobber } from '../components/loading-throbber';

interface MatchParams {
  categoryId: string;
}

interface CategoryPageProps extends RouteComponentProps<MatchParams> {
  triviaStore?: TriviaStore;
}

@inject('triviaStore')
@observer
export class CategoryPage extends React.Component<CategoryPageProps> {

  public componentDidMount() {
    const { match, triviaStore } = this.props;
    const { categoryId } = match.params;
    triviaStore!.fetchQuestions(categoryId);
  }

  public componentWillUnmount() {
    const { triviaStore } = this.props;
    triviaStore!.endRound();
  }

  private getAnswer(question: TriviaQuestion): string {
    const { triviaStore } = this.props;
    return triviaStore!.submittedAnswers!.get(question.question) || '';
  }

  private playAgain() {
    const { match, triviaStore } = this.props;
    const { categoryId } = match.params;
    triviaStore!.fetchQuestions(categoryId).then(() => triviaStore!.startRound());
  }

  public render() {
    const { match, triviaStore } = this.props;
    const { categoryId } = match.params;
    const { currentQuestions, isLoadingQuestions, hasRoundStarted, questionIndex, correctAnswers, submittedAnswers } = triviaStore!;
    const category = triviaStore!.categories.find(cat => cat.id.toString() === categoryId);
    const title = category!.name;

    const hasQuestions = Boolean(currentQuestions && currentQuestions.length > 0);
    const question = hasQuestions ? currentQuestions![questionIndex] : null;
    const answer: string = question ? this.getAnswer(question) : '';

    const hasAnswers = submittedAnswers.size > 0;
    const showSummary = hasAnswers && !hasRoundStarted;

    const submitAnswer = (question: TriviaQuestion, answer: string) => {
      triviaStore!.submitAnswer(question, answer);
    };

    const startRound = () => triviaStore!.startRound();

    console.log("Hello", triviaStore, hasAnswers, hasRoundStarted, showSummary);
    return (
      <PageLayout classNames="category" title={title}>
        <>
          {isLoadingQuestions && <LoadingThrobber title="Loading Trivia Questions" />}
          {!isLoadingQuestions && !hasRoundStarted && !showSummary &&
            <button className="glass action" onClick={startRound}>
              <span>Start the Round</span>
              <div className="inner"></div>
            </button>
          }
          {hasRoundStarted && hasQuestions && <div className="question-container">
            <div className="score">Score: {correctAnswers}</div>
            {question &&
              <Question triviaQuestion={question} submitAnswer={submitAnswer} givenAnswer={answer} index={questionIndex + 1} />
            }
            {Boolean(answer) &&
              <button className="glass action" onClick={() => triviaStore!.nextQuestion()}>
                <span>Next Question</span>
                <div className="inner"></div>
              </button>
            }
          </div>}
          {showSummary && <div className="round-summary">
            Final Score: {correctAnswers} / {currentQuestions!.length || 0}
            <button className="action glass" onClick={() => this.playAgain()}>
              <span>Play Again</span>
              <div className="inner"></div>
            </button>
          </div>}
        </>
      </PageLayout>
    );
  }
}