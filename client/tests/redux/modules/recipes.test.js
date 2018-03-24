import _ from 'lodash';
import faker from 'faker';

import reducer, {
  FETCH_RECIPES,
  LIKE_RECIPE,
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
      const likeRecipeAction = {
        type: LIKE_RECIPE,
        likedRecipeId: 5,
        payload: createRecipe(5),
      };

      const currentState = [];

      expect(reducer(currentState, likeRecipeAction)).toEqual(currentState);
    });

    it('handles LIKE_RECIPE action with current state', () => {
      const likedRecipeId = 5;

      const likeRecipeAction = {
        type: LIKE_RECIPE,
        likedRecipeId,
        payload: createRecipe(5),
      };

      const currentState = createRecipes(10);

      expect(reducer(currentState, likeRecipeAction)[likedRecipeId]).toEqual(
        likeRecipeAction.payload,
      );
    });

    it('returns current state when an action of an unknown type is passed', () => {
      const actionOfUnknownType = { type: 'fdsakjklvjalsjd' };

      const currentState = { someKey: 'someValue' };

      expect(reducer(currentState, actionOfUnknownType)).toEqual(currentState);
    });
  });
});
