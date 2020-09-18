import React from 'react';
import Logo from './logo';
import Menu from './menu';
import './index.css';

export default () => {
  return (
    <header className="c-header">
      <Logo />
      <Menu />
    </header>
  );
}
