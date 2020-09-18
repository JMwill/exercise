import React from 'react';
import LuckDraw from './luck-draw';

export default () => {
  return (
    <div className="c-luck-draw">
      <header className="c-luck-draw__header">
        Luck draw
        <span className="c-luck-draw__header-small-word">抽奖活动</span>
      </header>
      <LuckDraw speed={200} times={3} />
    </div>
  )
}