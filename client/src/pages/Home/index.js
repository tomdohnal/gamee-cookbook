// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.scss';
import Header from '../../components/Header';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import LoadingError from '../../components/LoadingError';
import { fetchRecipes, type Recipes } from '../../redux/modules/recipes';

type Props = {
  recipes: Recipes,
  fetchRecipes: () => Promise<Recipes>,
};

type State = {
  loading: boolean,
  error: boolean,
};

class Home extends React.Component<Props, State> {
  state = {
    loading: !this.props.recipes.length,
    error: false,
  };

  componentDidMount() {
    const { fetchRecipes } = this.props;

    fetchRecipes()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ error: true, loading: false }));
  }

  render() {
    const { recipes } = this.props;
    const { loading, error } = this.state;

    return (
      <React.Fragment>
        <Header rightLink="/create" rightIcon="plus" rightText="Create">
          Cookbook
        </Header>
        <Container>
          {loading && !error ? (
            <Loader />
          ) : (
            recipes.map(recipe => (
              <div className="recipe" key={recipe.id}>
                <Link to={`/${recipe.id}`}>{recipe.name}</Link>
              </div>
            ))
          )}
          {error && !loading && <LoadingError />}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect(mapStateToProps, { fetchRecipes })(Home);
