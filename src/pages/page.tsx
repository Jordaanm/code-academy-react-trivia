import * as React from 'react';

import "../styles/page.scss";

interface PageProps {
  classNames: string;
  title: string;
}

export class PageLayout extends React.Component<PageProps> {

  public static defaultProps: Partial<PageProps> = {
    title: "Trivia Master"
  };

  public render() {
    const { children, classNames, title } = this.props;

    return (
      <div className={`page ${classNames}`} >
        <header>
          <div className="page-container">
            <div className="glass">
              <h1>{title}</h1>
              <div className="inner"></div>
            </div>
          </div>
        </header>
        <main>
          <div className="page-container">
            {children}
          </div>
        </main>
        <footer>
          <div className="page-container">
            Powered by the Open Trivia Database
          </div>
        </footer>
      </div>
    );
  }
}