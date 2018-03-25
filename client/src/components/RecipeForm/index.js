// @flow
import React, { Component } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';

import './style.scss';
import { type RecipeWithoutId } from '../../redux/modules/recipes';

type Props = {
  onFormSubmit: (recipe: RecipeWithoutId) => mixed,
};

type State = {
  name: {
    value: string,
    error: string,
  },
  ingredients: {
    value: Array<string>,
    error: string,
  },
  description: {
    value: string,
    error: string,
  },
  prepTime: {
    value: number,
    error: string,
  },
  cookTime: {
    value: number,
    error: string,
  },
  submiting: boolean,
};

type Target = {
  target: {
    value: string,
  },
};

class RecipeForm extends Component<Props, State> {
  state = {
    name: {
      value: '',
      error: '',
    },
    ingredients: {
      value: [''],
      error: '',
    },
    description: {
      value: '',
      error: '',
    },
    prepTime: {
      value: 0,
      error: '',
    },
    cookTime: {
      value: 0,
      error: '',
    },
    submiting: false,
  };

  onNameInputChange = ({ target: { value } }: Target) => {
    this.setState({
      name: {
        error: '',
        value,
      },
    });
  };

  onIngredientInputChange = (changedIngredientIndex: number) => ({
    target: { value },
  }: Target) => {
    const newIngredients = this.state.ingredients.value.map(
      (ingredient, index) =>
        index === changedIngredientIndex ? value : ingredient,
    );

    this.setState({ ingredients: { value: newIngredients, error: '' } });
  };

  onAddIngredientButtonClick = (e: Event) => {
    e.preventDefault();

    this.setState({
      ingredients: { value: [...this.state.ingredients.value, ''], error: '' },
    });
  };

  onDescriptionInputChange = ({ target: { value } }: Target) => {
    this.setState({
      description: {
        error: '',
        value,
      },
    });
  };

  onPrepTimeInputChange = ({ target: { value } }: Target) => {
    this.setState({
      prepTime: {
        error: '',
        value: +value,
      },
    });
  };

  onCookTimeInputChange = ({ target: { value } }: Target) => {
    this.setState({
      cookTime: {
        error: '',
        value: +value,
      },
    });
  };

  onFormSubmit = () => {
    const { name, ingredients, description, prepTime, cookTime } = this.state;
    let hasError = false;

    if (!name.value) {
      hasError = true;

      this.setState(({ name }) => ({
        name: { ...name, error: 'Enter the name of your recipe' },
      }));
    } else if (!/^[a-zA-Z0-9,./:()-]+$/.test(name.value)) {
      hasError = true;

      this.setState(({ name }) => ({
        name: {
          ...name,
          error: 'Only use letters, numbers and , . / : ( ) - ',
        },
      }));
    }

    if (!ingredients.value.filter(ingredient => !!ingredient).length) {
      hasError = true;

      this.setState(({ ingredients }) => ({
        ingredients: {
          ...ingredients,
          error: 'Add at least one ingredient',
        },
      }));
    }

    if (!description.value) {
      hasError = true;

      this.setState(({ description }) => ({
        description: {
          ...description,
          error: 'Enter the description of your recipe',
        },
      }));
    } else if (!/^[a-zA-Z0-9,./:()-]+$/.test(description.value)) {
      hasError = true;

      this.setState(({ description }) => ({
        description: {
          ...description,
          error: 'Only use letters, numbers and , . / : ( ) - ',
        },
      }));
    }

    if (!prepTime.value) {
      hasError = true;

      this.setState(({ prepTime }) => ({
        prepTime: {
          ...prepTime,
          error: 'Enter the prep time of your recipe',
        },
      }));
    }

    if (!cookTime.value) {
      hasError = true;

      this.setState(({ cookTime }) => ({
        cookTime: {
          ...cookTime,
          error: 'Enter the cook time of your recipe',
        },
      }));
    }

    if (!hasError) {
      this.setState({ submiting: true });

      this.props.onFormSubmit({
        name: name.value,
        description: description.value,
        ingredients: ingredients.value,
        prepTime: prepTime.value,
        cookTime: cookTime.value,
        likes: 0, // not using a mock server, I would omit the likes property as the server would create it for me
      });
    }
  };

  render() {
    const {
      name,
      ingredients,
      description,
      prepTime,
      cookTime,
      submiting,
    } = this.state;

    return (
      <Form className="form-recipe" onSubmit={this.onFormSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            value={name.value}
            onChange={this.onNameInputChange}
            className={name.error && 'error'}
          />
          {name.error && (
            <Label basic pointing>
              {name.error}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Ingredients</label>
          {ingredients.value.map((ingredient, index) => (
            <input
              key={index}
              onChange={this.onIngredientInputChange(index)}
              value={ingredient}
              className={ingredients.error && 'error'}
            />
          ))}
          {ingredients.error && (
            <Label basic pointing>
              {ingredients.error}
            </Label>
          )}
          <Button onClick={this.onAddIngredientButtonClick}>
            Add ingredient
          </Button>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            value={description.value}
            onChange={this.onDescriptionInputChange}
            className={description.error && 'error'}
          />
          {description.error && (
            <Label basic pointing>
              {description.error}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Prep time</label>
          <input
            type="number"
            min="0"
            value={prepTime.value}
            onChange={this.onPrepTimeInputChange}
            className={prepTime.error && 'error'}
          />
          {prepTime.error && (
            <Label basic pointing>
              {prepTime.error}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Cook time</label>
          <input
            type="number"
            min="0"
            value={cookTime.value}
            onChange={this.onCookTimeInputChange}
            className={cookTime.error && 'error'}
          />
          {cookTime.error && (
            <Label basic pointing>
              {cookTime.error}
            </Label>
          )}
        </Form.Field>
        <Button fluid loading={submiting}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default RecipeForm;