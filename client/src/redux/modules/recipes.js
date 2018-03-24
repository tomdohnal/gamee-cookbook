// @flow
import { type Dispatch } from 'redux';
import createReducer from '../createReducer';
import axios from '../../axios';

export const FETCH_RECIPES = 'RECIPES/FETCH_RECIPES';

type Recipe = {
  id: number,
  name: string,
  ingredients: string[],
  description: string,
  prepTime: number,
  cookTime: number,
  likes: number,
};

type Recipes = Recipe[];

type FetchRecipesAction = {
  type: typeof FETCH_RECIPES,
  payload: Recipes,
};

export const fetchRecipes = () => (dispatch: Dispatch) =>
  axios.get('/recipes').then(({ data }) => {
    dispatch({
      type: FETCH_RECIPES,
      payload: data,
    });
  });

export default createReducer([], {
  [FETCH_RECIPES]: (state: Recipes, action: FetchRecipesAction): Recipes =>
    action.payload,
});
