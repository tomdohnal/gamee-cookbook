// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Container from '../../components/Container';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import RecipeForm from '../../components/RecipeForm';
import {
  editRecipe,
  type Recipe,
  type RecipeWithoutId,
} from '../../redux/modules/recipes';

export type Props = {
  recipe: Recipe,
  history: {
    goBack: () => void,
    push: (path: string) => void,
  },
  loading: boolean,
  fetchingError: boolean,
  match: {
    params: {
      id: string,
    },
  },
  editRecipe: (recipe: Recipe) => Promise<Recipe>,
};

class EditRecipe extends React.Component<Props> {
  onFormSubmit = (recipe: RecipeWithoutId) => {
    const { editRecipe, match: { params: { id } } } = this.props;

    return editRecipe({ ...recipe, id: +id }).then(() =>
      this.props.history.push(`/${id}`),
    );
  };

  navigateBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { recipe, loading, fetchingError } = this.props;

    return (
      <React.Fragment>
        <Header
          leftIcon="arrow left"
          leftAction={this.navigateBack}
          rightText="Save"
        >
          Edit Recipe
        </Header>
        <Container>
          {loading && <Loader />}
          {!loading && fetchingError && <Error />}
          {!loading &&
            !fetchingError &&
            !recipe && <Error>Recipe not found.</Error>}
          {!loading &&
            !fetchingError &&
            !!recipe && (
              <RecipeForm recipe={recipe} onFormSubmit={this.onFormSubmit} />
            )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (
  { recipes },
  { match: { params: { id } }, loading, fetchingError },
) => {
  if (!loading) {
    if (!fetchingError) {
      return {
        recipe: recipes.find(recipe => +recipe.id === +id),
      };
    }

    return { fetchingError: true };
  }

  return { loading: true };
};

export default connect(mapStateToProps, { editRecipe })(EditRecipe);
