import React from 'react';

export default () => {
  const style={
    width: 120,
    height: 20,
    display: 'inline-block',
    border: 'none',
    outline: 'none',
  }
  return (
    <input type='password' style={style}/>
  );
};