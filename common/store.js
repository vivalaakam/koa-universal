import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default async function storeFactory({ initialState, sagaMiddleware }, ext = {}) {
  const middleware = applyMiddleware(thunkMiddleware, sagaMiddleware);
  const enhancer = compose(middleware);
  return createStore(reducer(ext), initialState, enhancer);
}
