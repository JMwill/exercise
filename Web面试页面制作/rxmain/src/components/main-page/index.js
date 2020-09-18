import React from 'react';
import Carousel from './carousel';
import ArticleList from './article-list';
import './index.css';

export default () => {
  return (
    <div className="main-page">
      <Carousel />
      <ArticleList />
    </div>
  )
}