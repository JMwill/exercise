import React from 'react';
import './App.css';
import Header from './components/header';
import MainPage from './components/main-page';
import LuckDrawPage from './components/luck-draw-page';
import mainPageBg from './img/一页背景.png';
import luckDrawPageBg from './img/二页背景.png';

const MainPageApp = (
    <div className="App" style={{backgroundImage: `url(${mainPageBg})`}}>
      <Header />
      <MainPage />
    </div>
)
const LuckDrawPageApp = (
    <div className="App" style={{backgroundImage: `url(${luckDrawPageBg})`}}>
      <Header />
      <LuckDrawPage />
    </div>
)

function App() {
  const path = window.location.pathname;
  switch (path) {
    case '/luck-draw.html':
      return LuckDrawPageApp
    default:
      return MainPageApp
  }
}

export default App;
