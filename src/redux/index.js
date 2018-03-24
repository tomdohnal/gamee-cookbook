import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import recipesReducer from './modules/recipes';

const reducers = combineReducers({
  recipes: recipesReducer,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
