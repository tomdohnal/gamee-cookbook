// @flow
import createReducer from '../createReducer';
import axios from '../../axios';

export const FETCH_RECIPES = 'RECIPES/FETCH_RECIPES';
export const LIKE_RECIPE = 'RECIPES/LIKE_RECIPE';

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

type FetchRecipesDispatch = (action: FetchRecipesAction) => void;

export const fetchRecipes = () => (dispatch: FetchRecipesDispatch) =>
  axios.get('/recipes').then(({ data }) => {
    dispatch({
      type: FETCH_RECIPES,
      payload: data,
    });
  });

type LikeRecipeAction = {
  type: typeof LIKE_RECIPE,
  likedRecipeId: number,
  payload: Recipe,
};

type LikeRecipeDispatch = (action: LikeRecipeAction) => void;

export const likeRecipe = (recipeId: number, currentLikesCount: number) => (
  dispatch: LikeRecipeDispatch,
) =>
  axios
    .patch(`/recipes/${recipeId}`, { likes: currentLikesCount + 1 })
    .then(({ data }) => {
      dispatch({
        type: LIKE_RECIPE,
        likedRecipeId: recipeId,
        payload: data,
      });
    });

export default createReducer([], {
  [FETCH_RECIPES]: (state: Recipes, action: FetchRecipesAction): Recipes =>
    action.payload,
  [LIKE_RECIPE]: (state: Recipes, action: LikeRecipeAction): Recipes => {
    if (!state.length) {
      return state;
    }

    return state.map(recipe => {
      if (recipe.id === action.likedRecipeId) {
        return action.payload;
      }

      return recipe;
    });
  },
});
