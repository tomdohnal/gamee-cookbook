// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import './style.scss';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Container from '../../components/Container';
import Paint from '../../components/Paint';
import { type Recipe, likeRecipe } from '../../redux/modules/recipes';

export type Props = {
  recipe: Recipe,
  history: {
    push: (path: string) => void,
  },
  loading: boolean,
  fetchingError: boolean,
  match: {
    params: {
      id: string,
    },
  },
  likeRecipe: (recipe: Recipe) => Promise<Recipe>,
};

class RecipeDetail extends React.Component<Props> {
  navigateHome = () => {
    this.props.history.push('/');
  };

  likeRecipe = () => {
    const { recipe } = this.props;

    this.props.likeRecipe(recipe);
  };

  render() {
    const {
      recipe,
      loading,
      fetchingError,
      match: { params: { id } },
    } = this.props;

    return (
      <React.Fragment>
        <Header
          leftIcon="arrow left"
          leftAction={this.navigateHome}
          rightIcon="edit"
          rightText="Edit"
          rightLink={`edit/${id}`}
        >
          Recipe Detail
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
              <React.Fragment>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <p>
                  <strong>Ingredients:&nbsp;</strong>
                  {recipe.ingredients.map((ingredient, index) => {
                    if (index !== recipe.ingredients.length - 1) {
                      return <span key={index}>{`${ingredient}, `}</span>;
                    }

                    return <span key={index}>{ingredient}</span>;
                  })}
                </p>
                <p>
                  <strong>Cook time:&nbsp;</strong>
                  {recipe.cookTime}
                </p>
                <p>
                  <strong>Prep time:&nbsp;</strong>
                  {recipe.prepTime}
                </p>
                <p>
                  <strong>Likes:&nbsp;</strong>
                  {recipe.likes}&nbsp;
                  {recipe.liked &&
                  recipe.liked.find(
                    liker => liker === localStorage.getItem('token'),
                  ) ? (
                    <Button disabled compact>
                      Liked
                    </Button>
                  ) : (
                    <Button onClick={this.likeRecipe} compact>
                      Like
                    </Button>
                  )}
                </p>
                {recipe.drawing &&
                  recipe.drawing.length && (
                    <div>
                      <p>
                        <strong>Drawing:</strong>
                      </p>
                      <Paint drawing={recipe.drawing} disabled />
                    </div>
                  )}
              </React.Fragment>
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

export default connect(mapStateToProps, { likeRecipe })(RecipeDetail);
