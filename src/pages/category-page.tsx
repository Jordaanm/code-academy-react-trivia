import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { PageLayout } from './page';
import { TriviaStore } from '../stores/trivia-store';
import { Question } from '../components/question';

import "../styles/category-page.scss";
import { TriviaQuestion, QuestionResult } from '../types';
import { LoadingThrobber } from '../components/loading-throbber';
import { RoundSummary } from '../components/round-summary';

interface MatchParams {
  categoryId: string;
}

interface CategoryPageProps extends RouteComponentProps<MatchParams> {
  triviaStore?: TriviaStore;
}

@inject('triviaStore')
@observer
export class CategoryPage extends React.Component<CategoryPageProps> {

  private questionListRef = React.createRef<HTMLDivElement>();
 
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
    const result: QuestionResult = triviaStore!.selectedAnswers!.get(question.question)!;
    return result ? result.givenAnswer : '';
  }

  private playAgain() {
    const { match, triviaStore } = this.props;
    const { categoryId } = match.params;
    triviaStore!.fetchQuestions(categoryId).then(() => {
      triviaStore!.startRound();
      
      if (this.questionListRef.current) {
        this.questionListRef.current.scrollIntoView();
      }
    });
  }

  public render() {
    const { match, triviaStore } = this.props;
    const { categoryId } = match.params;
    const { currentQuestions, isLoadingQuestions, hasRoundStarted, correctAnswers, selectedAnswers } = triviaStore!;
    const category = triviaStore!.categories.find(cat => cat.id.toString() === categoryId);
    const title = category!.name;

    const hasQuestions = Boolean(currentQuestions && currentQuestions.length > 0);

    const answeredQuestions = currentQuestions ? currentQuestions.filter(q => this.getAnswer(q)) : [];
    const areAllQuestionsAnswered = hasQuestions && currentQuestions && (answeredQuestions.length === currentQuestions.length);
    const showSummary = hasQuestions && areAllQuestionsAnswered && !hasRoundStarted;

    const selectAnswer = (question: TriviaQuestion, answer: string) => {
      triviaStore!.selectAnswer(question, answer);
    };

    const startRound = () => triviaStore!.startRound();
    const endRound = () => triviaStore!.endRound();

    return (
      <PageLayout classNames="category" title={title}>
        <>
          {isLoadingQuestions && <LoadingThrobber title="Loading Trivia Questions" />}
          {!isLoadingQuestions && !hasRoundStarted && !showSummary &&
            <button className="action" onClick={startRound}>
              <span>Start the Round</span>
            </button>
          }
          <div className="scrollMarker" ref={this.questionListRef}></div>
          {hasRoundStarted && hasQuestions && <div className="question-container column">
            <div className="question-list column">
            {
              currentQuestions!.map((question, index) => <Question
                key={question.question}
                triviaQuestion={question}
                givenAnswer={this.getAnswer(question)}
                selectAnswer={selectAnswer}
                index={index + 1}
              />)
            }
            </div>
            { answeredQuestions.length > 0 &&
              <div className="submit-answers row">
                <button className="action" onClick={endRound}>Submit Answers</button>
              </div>
            }
          </div>}
          {showSummary && <RoundSummary
            answers={selectedAnswers}
            score={correctAnswers}
            total={currentQuestions!.length || 0}
            playAgain={() => this.playAgain()}
          />}
        </>
      </PageLayout>
    );
  }
}