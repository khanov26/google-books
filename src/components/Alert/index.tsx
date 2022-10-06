import React, { FC, ReactNode } from 'react';
import './styles.scss';

interface Props {
  variant: 'success' | 'warning' | 'error';
  children: ReactNode;
}

const Alert: FC<Props> = ({ variant, children }) => {
  return <div className={`alert alert--${variant}`}>{children}</div>;
};

export default Alert;
