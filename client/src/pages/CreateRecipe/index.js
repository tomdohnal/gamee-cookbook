// @flow
import React, { Component } from 'react';

import Header from '../../components/Header';

type Props = {
  history: {
    goBack: () => void,
  },
};

class CreateRecipe extends Component<Props> {
  navigateBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Header
          leftIcon="arrow left"
          leftAction={this.navigateBack}
          rightText="Save"
        >
          Create Recipe
        </Header>
      </div>
    );
  }
}

export default CreateRecipe;
