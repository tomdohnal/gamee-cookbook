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
  },
  createRecipe: (recipe: RecipeWithoutId) => Promise<Recipe>,
};

class CreateRecipe extends React.Component<Props> {
  navigateBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { createRecipe } = this.props;
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
          <RecipeForm onFormSubmit={createRecipe} />
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(null, { createRecipe })(CreateRecipe);
