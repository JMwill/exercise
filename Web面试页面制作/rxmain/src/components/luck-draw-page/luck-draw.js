import React from 'react';
import prize1 from '../../img/转轮物品位.png';
import prize2 from '../../img/转轮物品位2.png';
import './index.css';

export default class LuckDraw extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prizeList: [
        {id: 0, cover: prize1, order: 1, active: false},
        {id: 1, cover: prize2, order: 2, active: false},
        {id: 2, cover: prize1, order: 3, active: false},
        {id: 3, cover: prize2, order: 4, active: false},
        {id: 4, cover: prize1, order: 5, active: false},
        {id: 9, cover: prize2, order: 1, active: false},
        {id: 5, cover: prize2, order: 11, active: false},
        {id: 6, cover: prize1, order: 10, active: false},
        {id: 7, cover: prize2, order: 9, active: false},
        {id: 8, cover: prize1, order: 8, active: false},
      ]
    };
    this.luckNum = null;
    this.start = false;
    this.timestampHolder = null;
    this.activeList = [];
    this.active = this.active.bind(this);
    this.genLuckNum = this.genLuckNum.bind(this);
    this.drawStep = this.drawStep.bind(this);
    this.draw = this.draw.bind(this);
  }

  active(index) {
    const prizeList = this.state.prizeList;
    const newPrizeList = prizeList.map(i => ({...i, ...{active: false}}));
    newPrizeList.find(i => i.id === (index % prizeList.length)).active = true
    this.setState({ prizeList: newPrizeList });
  }

  drawStep(timestamp) {
    const l = this.activeList;
    if (!this.timestampHolder) { this.timestampHolder = timestamp; }
    const interval = timestamp - this.timestampHolder;
    if (interval > this.props.speed) {
      if (l.length) { this.active(l.shift()); }
      else { this.start = false; }
      this.timestampHolder = null;
    }
    window.requestAnimationFrame(this.drawStep)
  }

  genLuckNum() {
    const luckNum = Math.floor(Math.random() * this.state.prizeList.length)
    return luckNum;
  }

  draw() {
    if (this.start) return;
    this.start = true;
    const {times} = this.props;
    const {prizeList} = this.state;
    const luckNum = this.genLuckNum()
    const total = (times * prizeList.length) + (luckNum || 0);
    const newActiveList = [];

    this.luckNum = luckNum;
    for (let i = 0; i < total; i++) {
      newActiveList.push(i % prizeList.length);
    }
    this.activeList = newActiveList;
  }

  componentDidMount() {
    window.requestAnimationFrame(this.drawStep);
  }

  render() {
    const prizeList = this.state.prizeList;
    return (
      <div className="c-luck-draw__drawer">
        <div className="c-luck-draw__prize-cnt">
          {prizeList.slice(0, 4).map((i) =>
            <div
              key={i.id}
              className={`c-luck-draw__prize ${i.active ? 'c-luck-draw__prize_active' : ''}`}
              style={{backgroundImage: `url(${i.cover})`, order: i.order}}/>
          )}
        </div>
        <div className="c-luck-draw__prize-cnt">
          {prizeList.slice(4, 6).map((i) =>
            <div
              key={i.id}
              className={`c-luck-draw__prize ${i.active ? 'c-luck-draw__prize_active' : ''}`}
              style={{backgroundImage: `url(${i.cover})`, order: i.order}}/>
          )}
          <div className="c-luck-draw__trigger" onClick={this.draw}>
            <div className="c-luck-draw__trigger-btn luck-draw-trigger"/>
          </div>
        </div>
        <div className="c-luck-draw__prize-cnt">
          {prizeList.slice(6).map((i) =>
            <div
              key={i.id}
              className={`c-luck-draw__prize ${i.active ? 'c-luck-draw__prize_active' : ''}`}
              style={{backgroundImage: `url(${i.cover})`, order: i.order}}/>
          )}
        </div>
      </div>
    )
  }
}