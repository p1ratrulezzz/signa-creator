import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/rootReducer';

const logger = (store) => (next) => (action) => {
  console.info('logger: ', action.type);
  return next(action);
};

export default createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);
