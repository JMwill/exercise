(function() {
  const menu = $('.common-menu');
  const menuContent = menu.querySelector('.common-menu__content');
  const menuTrigger = menu.querySelector('.common-menu__handler');
  menuTrigger.addEventListener('click', (e) => {
    const isHide = menuContent.classList.contains('hidden');
    isHide ? menuContent.classList.remove('hidden') : menuContent.classList.add('hidden');
  })
})();