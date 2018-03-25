// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './style.scss';

type Props = {
  leftLink?: string,
  leftAction?: () => mixed,
  leftIcon?: string,
  leftText?: string,
  rightLink?: string,
  rightAction?: () => mixed,
  rightIcon?: string,
  rightText?: string,
  children?: string,
};

const Header = ({
  leftLink,
  leftAction,
  leftIcon,
  leftText,
  rightLink,
  rightAction,
  rightIcon,
  rightText,
  children,
}: Props) => (
  <div className="header">
    <div className="left">
      {leftLink && (
        <Link to={leftLink}>
          {leftIcon && <Icon name={leftIcon} />}
          {leftText && leftText}
        </Link>
      )}
      {leftAction && (
        <a onClick={leftAction}>
          {leftIcon && <Icon name={leftIcon} />}
          {leftText && leftText}
        </a>
      )}
    </div>
    <h1>{children}</h1>
    <div className="right">
      {rightLink && (
        <Link to={rightLink}>
          {rightIcon && <Icon name={rightIcon} />}
          {rightText && rightText}
        </Link>
      )}
      {rightAction && (
        <a onClick={rightAction}>
          {rightIcon && <Icon name={rightIcon} />}
          {rightText && rightText}
        </a>
      )}
    </div>
  </div>
);

export default Header;
