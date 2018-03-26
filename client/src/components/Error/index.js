// @flow
import * as React from 'react';

import './style.scss';

type Props = {
  children?: React.Node,
};

const Error = ({ children }: Props) => (
  <div className="error">
    {children || 'There has been an unexpected error.'}
  </div>
);

export default Error;
