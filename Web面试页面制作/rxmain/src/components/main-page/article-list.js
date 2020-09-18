import React from 'react';
import ArticleItem from './article-item';

export default () => {
  const itemList = [
    {id: 1, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '8-24'},
    {id: 2, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '7-21'},
    {id: 3, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '7-02'},
    {id: 4, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '6-20'},
    {id: 5, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '6-15'},
    {id: 6, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '6-15'},
    {id: 7, title: '《暗黑之书》被选为2018年度最佳爆肝手游就问你信不信', date: '6-15'},
  ]
  return (
    <article className="c-article-list">
      <header className="c-article-list__header">IGN年鉴不为人知的十个评判标准</header>
      <div className="c-article-list__container">
        {itemList.map(i => <ArticleItem key={i.id} {...i} />)}
        <div className="c-article-list__more">
          <div className="c-article-list__more-word">更多</div>
        </div>
      </div>
    </article>
  )
}