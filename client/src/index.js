import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import store from './redux';

ReactDOM.render(
  <AppContainer>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
