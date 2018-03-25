// @flow
import * as React from 'react'

import './style.scss';

type Props = {
  children: React.Node,
};

const Container = ({ children }: Props) => (
  <div className="container">{children}</div>
);

export default Container;
