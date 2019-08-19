import * as React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import { TriviaStore } from './stores/trivia-store';

import './styles/app.scss';
import { HomePage } from './pages/home';
import { CategoryPage } from './pages/category-page';

const triviaStore: TriviaStore = new TriviaStore();

const App: React.FC = () => {
  return (
    <Provider triviaStore={triviaStore}>
      <div id="grid"></div>
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:categoryId" component={CategoryPage} />
      </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
