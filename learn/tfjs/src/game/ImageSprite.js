let _imageSprite = null;

export function getImageSprite() {
  return _imageSprite;
}

export function loadImageSprite() {
  return new Promise((resolve) => {
    const imageSprite = document.createElement('img');
    imageSprite.src = require('./images/offline-sprite.png');
    console.log(imageSprite.src)
    imageSprite.addEventListener('load', () => {
      _imageSprite = imageSprite;
      resolve();
    });
  });
}
