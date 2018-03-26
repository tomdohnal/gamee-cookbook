// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Home, { type Props as HomeProps } from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import { fetchRecipes, type Recipes } from './redux/modules/recipes';

type Props = {
  fetchRecipes: () => Promise<Recipes>,
};

type State = {
  fetchingError: boolean,
  fetchingRecipes: boolean,
};

class App extends Component<Props, State> {
  state = {
    fetchingError: false,
    fetchingRecipes: true,
  };

  componentDidMount() {
    this.props
      .fetchRecipes()
      .then(() => this.setState({ fetchingRecipes: false }))
      .catch(() => this.setState({ fetchingError: true }));
  }

  render() {
    const { fetchingError, fetchingRecipes } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props: HomeProps) => (
              <Home
                {...props}
                loading={fetchingRecipes}
                fetchingError={fetchingError}
              />
            )}
          />
          <Route exact path="/create" component={CreateRecipe} />
          <Route exact path="/:id" component={RecipeDetail} />
          <Route exact path="/edit/:id" component={EditRecipe} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchRecipes })(App);
