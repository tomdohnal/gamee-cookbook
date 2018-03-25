import _ from 'lodash';
import faker from 'faker';
import AxiosMockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import axios from '../../../src/axios';

import reducer, {
  FETCH_RECIPES,
  CREATE_RECIPE,
  EDIT_RECIPE,
  LIKE_RECIPE,
  fetchRecipes,
  createRecipe,
  editRecipe,
  likeRecipe,
} from '../../../src/redux/modules/recipes';

const createFakeRecipe = index => ({
  id: index,
  name: faker.lorem.words(3),
  ingredients: _.times(4 + faker.random.number(6), () => faker.lorem.word()),
  description: faker.lorem.paragraph(),
  prepTime: (faker.random.number(2) + 1) * 10,
  cookTime: (faker.random.number(8) + 1) * 10,
  likes: faker.random.number(20),
});

const createFakeRecipes = count =>
  _.times(count, index => createFakeRecipe(index));

describe('recipes', () => {
  describe('action creators', () => {
    const mockAxios = new AxiosMockAdapter(axios);
    const mockStore = configureMockStore([thunk]);

    it('creates fetchRecipesAction action', () => {
      const recipes = createFakeRecipes(10);

      const expectedActions = [{ type: FETCH_RECIPES, payload: recipes }];

      const store = mockStore();

      mockAxios.onGet('/recipes').reply(200, recipes);

      store.dispatch(fetchRecipes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates createRecipeAction action', () => {
      const newRecipeId = 10;

      const recipe = createFakeRecipe(newRecipeId);

      const expectedActions = [{ type: CREATE_RECIPE, payload: { ...recipe } }];

      const store = mockStore();

      mockAxios.onPost('/recipes').reply(200, { ...recipe, id: newRecipeId });

      store.dispatch(createRecipe(recipe)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates editRecipeAction action', () => {
      const editedRecipeId = 10;

      const editedRecipe = createFakeRecipe(editedRecipeId);

      const expectedActions = [
        { type: EDIT_RECIPE, payload: { ...editedRecipe } },
      ];

      const store = mockStore();

      mockAxios
        .onPut(`/recipes/${editedRecipe}`)
        .reply(200, { ...editedRecipe });

      store.dispatch(editRecipe(editedRecipe)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates likeRecipeAction action', () => {
      const likedRecipeId = 5;

      const recipe = createFakeRecipe(likedRecipeId);

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
      const recipes = createFakeRecipes(10);

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      expect(reducer([], fetchRecipesAction)).toEqual(recipes);
    });

    it('handles FETCH_RECIPES action with non-empty current state', () => {
      const recipes = createFakeRecipes(10);

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      const currentState = createFakeRecipes(10);

      expect(reducer(currentState, fetchRecipesAction)).toEqual(recipes);
    });

    it('handles CREATE_RECIPE action with empty current state', () => {
      const recipe = createFakeRecipe(5);

      const createRecipeAction = {
        type: CREATE_RECIPE,
        payload: recipe,
      };

      expect(reducer([], createRecipeAction)).toEqual([recipe]);
    });

    it('handles CREATE_RECIPE action with non-empty current state', () => {
      const recipe = createFakeRecipe(5);

      const createRecipeAction = {
        type: CREATE_RECIPE,
        payload: recipe,
      };

      const currentState = createFakeRecipes(10);

      expect(reducer(currentState, createRecipeAction)).toEqual([
        ...currentState,
        recipe,
      ]);
    });

    it('handles EDIT_RECIPE action with empty current state', () => {
      const editedRecipe = createFakeRecipe(5);

      const editRecipeAction = {
        type: EDIT_RECIPE,
        payload: editedRecipe,
      };

      const currentState = [];

      expect(reducer(currentState, editRecipeAction)).toEqual(currentState);
    });

    it('handles EDIT_RECIPE action with non-empty current state', () => {
      const editedRecipe = createFakeRecipe(5);

      const editRecipeAction = {
        type: EDIT_RECIPE,
        payload: editedRecipe,
      };

      const currentState = createFakeRecipes(10);

      expect(reducer(currentState, editRecipeAction)[editedRecipe.id]).toEqual(
        editedRecipe,
      );
    });

    it('handles LIKE_RECIPE action with no current state', () => {
      const likedRecipeId = 5;

      const likeRecipeAction = {
        type: LIKE_RECIPE,
        likedRecipeId,
        payload: {
          likedRecipeId,
          recipe: createFakeRecipe(likedRecipeId),
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
          recipe: createFakeRecipe(likedRecipeId),
        },
      };

      const currentState = createFakeRecipes(10);

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
