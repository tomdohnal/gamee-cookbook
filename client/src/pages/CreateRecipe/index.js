// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Container from '../../components/Container';
import RecipeForm from '../../components/RecipeForm';
import {
  createRecipe,
  type RecipeWithoutId,
  type Recipe,
} from '../../redux/modules/recipes';

type Props = {
  history: {
    goBack: () => void,
    push: (path: string) => void,
  },
  createRecipe: (recipe: RecipeWithoutId) => Promise<Recipe>,
};

class CreateRecipe extends React.Component<Props> {
  onFormSubmit = (recipe: RecipeWithoutId) => {
    const { createRecipe } = this.props;

    createRecipe(recipe).then(() => this.props.history.push('/'));
  };

  navigateBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <React.Fragment>
        <Header
          leftIcon="arrow left"
          leftAction={this.navigateBack}
          rightText="Save"
        >
          Create Recipe
        </Header>
        <Container>
          <RecipeForm onFormSubmit={this.onFormSubmit} />
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(null, { createRecipe })(CreateRecipe);
