import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import Home from './pages/Home';
import store from './redux';

ReactDOM.render(
  <AppContainer>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
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
