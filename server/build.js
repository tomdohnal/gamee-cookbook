const _ = require('lodash');
const faker = require('faker');

module.exports = function() {
  return {
    recipes: _.times(100, index => ({
      id: index,
      name: faker.lorem.words(3),
      ingredients: _.times(4 + faker.random.number(6), () =>
        faker.lorem.word(),
      ),
      description: faker.lorem.paragraph(),
      prepTime: (faker.random.number(2) + 1) * 10,
      cookTime: (faker.random.number(8) + 1) * 10,
      likes: faker.random.number(20),
    })),
  };
};
