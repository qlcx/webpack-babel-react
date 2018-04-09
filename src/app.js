import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Router from './router';

import './styles/style.css';
import './styles/normalize.css';

const render = Component => (
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
);

render(Router);

if (module.hot) {
  module.hot.accept('./router', () => {
    const NewRouter = require('./router').default;
    render(NewRouter);
  });
}
