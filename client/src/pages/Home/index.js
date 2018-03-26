// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { type Recipes } from '../../redux/modules/recipes';

export type Props = {
  recipes: Recipes,
  loading: boolean,
  fetchingError: boolean,
};

const Home = ({ recipes, loading, fetchingError }: Props) => (
  <React.Fragment>
    <Header rightLink="/create" rightIcon="plus" rightText="Create">
      Cookbook
    </Header>
    <Container>
      {loading && !fetchingError ? (
        <Loader />
      ) : (
        recipes.map(recipe => (
          <div className="recipe" key={recipe.id}>
            <h1>
              <Link to={`/${recipe.id}`}>{recipe.name}</Link>
            </h1>
            <p>
              Cook time: {recipe.cookTime} Prep time: {recipe.prepTime}
            </p>
          </div>
        ))
      )}
      {fetchingError && !loading && <Error />}
    </Container>
  </React.Fragment>
);

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect(mapStateToProps)(Home);
