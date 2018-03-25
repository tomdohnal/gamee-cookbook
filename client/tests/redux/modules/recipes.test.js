import _ from 'lodash';
import faker from 'faker';
import AxiosMockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../../../src/axios';

import reducer, {
  FETCH_RECIPES,
  LIKE_RECIPE,
  fetchRecipes,
  likeRecipe,
} from '../../../src/redux/modules/recipes';

const createRecipe = index => ({
  id: index,
  name: faker.lorem.words(3),
  ingredients: _.times(4 + faker.random.number(6), () => faker.lorem.word()),
  description: faker.lorem.paragraph(),
  prepTime: (faker.random.number(2) + 1) * 10,
  cookTime: (faker.random.number(8) + 1) * 10,
  likes: faker.random.number(20),
});

const createRecipes = count => _.times(count, index => createRecipe(index));

describe('recipes', () => {
  describe('action creators', () => {
    const mockAxios = new AxiosMockAdapter(axios);
    const mockStore = configureMockStore([thunk]);

    it('creates FetchRecipesAction action', () => {
      const recipes = createRecipes(10);

      const expectedActions = [{ type: FETCH_RECIPES, payload: recipes }];

      const store = mockStore();

      mockAxios.onGet('/recipes').reply(200, recipes);

      store.dispatch(fetchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LikeRecipeAction action', () => {
      const likedRecipeId = 5;

      const recipe = createRecipes(likedRecipeId);

      const expectedActions = [
        { type: LIKE_RECIPE, payload: { likedRecipeId, recipe } },
      ];

      const store = mockStore();

      mockAxios.onPatch(`/recipes/${likedRecipeId}`).reply(200, recipe);

      store.dispatch(likeRecipe(likedRecipeId, 10)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('reducer', () => {
    it('handles FETCH_RECIPES action with empty current state', () => {
      const recipes = createRecipes(10);

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      expect(reducer([], fetchRecipesAction)).toEqual(recipes);
    });

    it('handles FETCH_RECIPES action with non-empty current state', () => {
      const recipes = createRecipes(10);

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      const currentState = createRecipes(10);

      expect(reducer(currentState, fetchRecipesAction)).toEqual(recipes);
    });

    it('handles LIKE_RECIPE action with no current state', () => {
      const likedRecipeId = 5;

      const likeRecipeAction = {
        type: LIKE_RECIPE,
        likedRecipeId,
        payload: {
          likedRecipeId,
          recipe: createRecipe(likedRecipeId),
        },
      };

      const currentState = [];

      expect(reducer(currentState, likeRecipeAction)).toEqual(currentState);
    });

    it('handles LIKE_RECIPE action with current state', () => {
      const likedRecipeId = 5;

      const likeRecipeAction = {
        type: LIKE_RECIPE,
        likedRecipeId,
        payload: {
          likedRecipeId,
          recipe: createRecipe(likedRecipeId),
        },
      };

      const currentState = createRecipes(10);

      expect(reducer(currentState, likeRecipeAction)[likedRecipeId]).toEqual(
        likeRecipeAction.payload.recipe,
      );
    });

    it('returns current state when an action of an unknown type is passed', () => {
      const actionOfUnknownType = { type: 'fdsakjklvjalsjd' };

      const currentState = { someKey: 'someValue' };

      expect(reducer(currentState, actionOfUnknownType)).toEqual(currentState);
    });
  });
});
