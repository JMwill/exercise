import React from 'react';
import img1 from '../../img/滚动图片1.png';
import img2 from '../../img/滚动图片二.png';
import img3 from '../../img/滚动图片3.png';

export default class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      activeIndex: 0,
      imgList: [
        {href: img1},
        {href: img2},
        {href: img3},
      ],
    }
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.moveIndicator = this.moveIndicator.bind(this);
  }

  get listMoveStyl() {
    const current = this.containerRef.current
    const w = current ? current.clientWidth : 0;
    const i = this.state.activeIndex;
    return ({
      transform: `translateX(${-i * w}px)`,
    })
  }

  moveLeft() {
    const imgList = this.state.imgList;
    this.setState((state) => ({
      activeIndex: (state.activeIndex + 1) % imgList.length,
    }));
  }

  moveRight() {
    const imgList = this.state.imgList;
    this.setState((state) => {
      const index = state.activeIndex - 1
      return {
        activeIndex: index < 0 ? imgList.length - 1 : index,
      }
    });
  }

  moveIndicator(e) {
    const index = +e.currentTarget.dataset.index
    if (this.state.activeIndex !== index) {
      this.setState((state) => ({activeIndex: index}));
    }
  }

  render() {
    const imgList = this.state.imgList;
    const activeIndex = this.state.activeIndex;
    return (
      <div className="c-carousel">
        <div
          className="c-carousel__arrow c-carousel__arrow-l"
          onClick={this.moveLeft} />
        <div className="c-carousel__arrow c-carousel__arrow-r"
          onClick={this.moveRight} />
        <div ref={this.containerRef} className="c-carousel__list" style={{...this.listMoveStyl}}>
          {imgList.map((i, index) =>
            <img key={i.href}
              className="c-carousel__item"
              src={i.href}
              alt={`图${index}`} />)}
        </div>
        <div className="c-carousel__indicator">
          {imgList.map((i, index) => {
            return (
              <i key={i.href}
                data-index={index}
                onClick={this.moveIndicator}
                className={`c-carousel__indicator-dot ${activeIndex === index ? 'c-carousel__indicator-dot_active' : ''}`} />)}
            )
          }
        </div>
      </div>
    );
  }
}