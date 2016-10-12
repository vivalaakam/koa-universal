import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default async function storeFactory({ initialState }, ext = {}) {
  const middleware = applyMiddleware(thunkMiddleware);
  const enhancer = compose(middleware);
  return createStore(reducer(ext), initialState, enhancer);
}
