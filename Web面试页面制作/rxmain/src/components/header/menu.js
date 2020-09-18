import React from 'react';
import MenuItem from './menu-item';

const menuItemList = [
  {name: '首页', href: '#', active: true},
  {name: '新闻', href: '#'},
  {name: '产品', href: '#'},
  {name: '公司', href: '#'},
  {name: '图像', href: '#'},
  {name: '招募', href: '#'},
]

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }

  triggerMenu = () => {
    this.setState((state) => ({showMenu: !state.showMenu}));
  }
  render() {
    const {showMenu} = this.state;
    return (
      <div className={`c-header__menu ${showMenu && "c-header__menu_show"}`}>
        <div className="c-header__menu-content">
          {menuItemList.map((i) => <MenuItem key={i.name} {...i} />)}
        </div>
        <div className="c-header__menu-handler" onClick={this.triggerMenu}/>
      </div>
    )
  }
}