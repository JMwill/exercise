import React from 'react';

export default (props) => {
  return (
    <article className="c-article-item">
      <i className="c-article-item__icon"/>
      <p className="c-article-item__title"><a className="c-article-item__a" href="#" target="_blank">{props.title}</a></p>
      <span className="c-article-item__date">{props.date}</span>
    </article>
  )
}