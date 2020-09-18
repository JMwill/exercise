import React from 'react';

export default (props) => {
  const isActive = !!props.active;
  return (
    <div className={`c-header__menu-item ${isActive ? 'c-header__menu-item-active' : ''}`}>
      <a className={`c-header__menu-item-link ${isActive ? 'c-header__menu-item-link-active' : ''}`} href={props.href}>{props.name}</a>
    </div>
  );
}