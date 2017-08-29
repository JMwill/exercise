let ctxmenu = document.getElementById('j-contextmenu');
let menu = new Menu({
        menuData: menuData,
    }),
    menuCnt = menu.getContent();

ctxmenu.appendChild(menuCnt);
ctxmenu.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    let x = evt.layerX,
        y = evt.layerY;
    if (!menuCnt.contains(evt.target)) {
        menu.show({
            x: x,
            y: y,
        });
    }
});
ctxmenu.addEventListener('click', evt => {
    if (!menuCnt.contains(evt.target)) {
        menu.hide();
    }
});
