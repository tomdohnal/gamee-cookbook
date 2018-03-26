// @flow
import * as React from 'react'
import { Container as SemanticUIContainer } from 'semantic-ui-react';

import './style.scss';

type Props = {
  children: React.Node,
};

const Container = ({ children }: Props) => (
  <SemanticUIContainer>{children}</SemanticUIContainer>
);

export default Container;
