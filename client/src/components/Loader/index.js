import React from 'react';
import { Loader as SemanticUILoader } from 'semantic-ui-react';

import './style.scss';

const Loader = () => (
  <div className="loader">
    <SemanticUILoader active inline="centered" size="massive" />
  </div>
);

export default Loader;
