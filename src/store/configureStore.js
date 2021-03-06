import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/combinedReducer';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/combinedReducer', () => {
      const nextReducer = require('../reducers/combinedReducer') // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
