// @flow
import createReducer from '../createReducer';
import axios from '../../axios';

export const FETCH_RECIPES = 'RECIPES/FETCH_RECIPES';
export const CREATE_RECIPE = 'RECIPES/CREATE_RECIPE';
export const EDIT_RECIPE = 'RECIPES/EDIT_RECIPE';
export const LIKE_RECIPE = 'RECIPES/LIKE_RECIPE';

export type RecipeWithoutId = {
  name: string,
  ingredients: string[],
  description: string,
  prepTime: number,
  cookTime: number,
  likes: number,
};

export type Recipe = RecipeWithoutId & { id: number };

export type Recipes = Recipe[];

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

type CreateRecipeAction = {
  type: typeof CREATE_RECIPE,
  payload: Recipe,
};

type CreateRecipeDispatch = (action: CreateRecipeAction) => void;

export const createRecipe = (recipe: RecipeWithoutId) => (
  dispatch: CreateRecipeDispatch,
) =>
  axios.post('/recipes', { ...recipe }).then(({ data }) => {
    dispatch({
      type: CREATE_RECIPE,
      payload: data,
    });
  });

type EditRecipeAction = {
  type: typeof EDIT_RECIPE,
  payload: Recipe,
};

type EditRecipeDispatch = (action: EditRecipeAction) => void;

export const editRecipe = (recipe: Recipe) => (dispatch: EditRecipeDispatch) =>
  axios.put(`/recipes/${recipe.id}`, { ...recipe }).then(({ data }) => {
    dispatch({
      type: EDIT_RECIPE,
      payload: data,
    });
  });

type LikeRecipeAction = {
  type: typeof LIKE_RECIPE,
  payload: {
    likedRecipeId: number,
    recipe: Recipe,
  },
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
        payload: { likedRecipeId: recipeId, recipe: data },
      });
    });

export default createReducer([], {
  [FETCH_RECIPES]: (state: Recipes, action: FetchRecipesAction): Recipes =>
    action.payload,
  [CREATE_RECIPE]: (state: Recipes, action: CreateRecipeAction): Recipes => [
    ...state,
    action.payload,
  ],
  [EDIT_RECIPE]: (state: Recipes, action: EditRecipeAction): Recipes => {
    if (!state.length) {
      return state;
    }

    return state.map(recipe => {
      if (recipe.id === action.payload.id) {
        return action.payload;
      }

      return recipe;
    });
  },
  [LIKE_RECIPE]: (state: Recipes, action: LikeRecipeAction): Recipes => {
    if (!state.length) {
      return state;
    }

    return state.map(recipe => {
      if (recipe.id === action.payload.likedRecipeId) {
        return action.payload.recipe;
      }

      return recipe;
    });
  },
});
