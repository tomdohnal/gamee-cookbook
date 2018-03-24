import _ from 'lodash';
import faker from 'faker';

import reducer, { FETCH_RECIPES } from '../../../src/redux/modules/recipes';

describe('recipes', () => {
  describe('reducer', () => {
    it('handles FETCH_RECIPES action with empty current state', () => {
      const recipes = _.times(10, index => ({
        id: index,
        name: faker.lorem.words(3),
        ingredients: _.times(4 + faker.random.number(6), () =>
          faker.lorem.word(),
        ),
        description: faker.lorem.paragraph(),
        prepTime: (faker.random.number(2) + 1) * 10,
        cookTime: (faker.random.number(8) + 1) * 10,
        likes: faker.random.number(20),
      }));

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      expect(reducer([], fetchRecipesAction)).toEqual(recipes);
    });

    it('handles FETCH_RECIPES action with non-empty current state', () => {
      const recipes = _.times(10, index => ({
        id: index,
        name: faker.lorem.words(3),
        ingredients: _.times(4 + faker.random.number(6), () =>
          faker.lorem.word(),
        ),
        description: faker.lorem.paragraph(),
        prepTime: (faker.random.number(2) + 1) * 10,
        cookTime: (faker.random.number(8) + 1) * 10,
        likes: faker.random.number(20),
      }));

      const fetchRecipesAction = {
        type: FETCH_RECIPES,
        payload: recipes,
      };

      const currentState = _.times(10, index => ({
        id: index,
        name: faker.lorem.words(3),
        ingredients: _.times(4 + faker.random.number(6), () =>
          faker.lorem.word(),
        ),
        description: faker.lorem.paragraph(),
        prepTime: (faker.random.number(2) + 1) * 10,
        cookTime: (faker.random.number(8) + 1) * 10,
        likes: faker.random.number(20),
      }));

      expect(reducer(currentState, fetchRecipesAction)).toEqual(recipes);
    });

    it('returns current state when an action of an unknown type is passed', () => {
      const actionOfUnknownType = { type: 'fdsakjklvjalsjd' };

      const currentState = { someKey: 'someValue' };

      expect(reducer(currentState, actionOfUnknownType)).toEqual(currentState);
    });
  });
});
