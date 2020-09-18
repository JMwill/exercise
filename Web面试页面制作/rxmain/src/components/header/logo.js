import React from 'react';
import logo from '../../img/LOGO.png';

export default (props) => {
  return (
      <img src={logo} alt={props.alt} className="c-header__logo"/>
  )
}