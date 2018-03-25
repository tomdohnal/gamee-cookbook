import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import store from './redux';

ReactDOM.render(
  <AppContainer>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateRecipe} />
            <Route exact path="/:id" component={RecipeDetail} />
            <Route exact path="/edit/:id" component={EditRecipe} />
          </Switch>
        </div>
      </BrowserRouter>
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
