const _ = require('lodash');
const faker = require('faker');

module.exports = function() {
  return {
    recipes: _.times(5, index => ({
      id: index,
      name: faker.lorem.words(3),
      ingredients: _.times(4 + faker.random.number(6), () =>
        faker.lorem.word(),
      ),
      description: faker.lorem.paragraph(),
      prepTime: (faker.random.number(2) + 1) * 10,
      cookTime: (faker.random.number(8) + 1) * 10,
      likes: faker.random.number(20),
      drawing: _.times(faker.random.number(100), () => ({
        x: faker.random.number(400),
        y: faker.random.number(200),
      })),
    })),
  };
};
