/**
 * 判断对象是否是数组
 *
 * @param {array} a 需要判断的对象
 * @return {boolean} 是否是数组
 */
let isArray = function(a) {
    return Array.isArray ?
           Array.isArray(a) :
           Object.prototype
                .toString
                .call(a)
                .slice(8)
                .toLowerCase() === 'array';
}

/**
 * 创建个性化菜单文档片段
 *
 * @param {object[]} menu 菜单列表
 * @param {boolean} isSub 是否是子菜单
 * @return {DocumentFragment} 返回创建完成的菜单文档片段
 */
let createCustomMenu = function(menu, isSub) {
    let cntDiv = document.createElement('div');
    cntDiv.setAttribute('class', isSub ? 'menu-subcnt hide' : 'menu-cnt hide');

    for (let i = 0, il = menu.length; i < il; i++) {
        let item = menu[i];
        let div = document.createElement('div');
        div.setAttribute('class', 'menu-item');
        div.setAttribute('data-menu-name', item.name);

        let p = document.createElement('p');
        p.setAttribute('class', 'menu-text');
        p.innerText = item.value;

        div.appendChild(p);
        if (isArray(item.subMenu)) {
            div.appendChild(createCustomMenu(item.subMenu, true));
        }
        cntDiv.appendChild(div);
    }
    return cntDiv;
}

let menu = createCustomMenu([
    {
        name: 'menu1',
        value: 'menu 1',
    },
    {
        name: 'menu2',
        value: 'menu 2',
    },
    {
        name: 'menu3',
        value: 'menu 3',
        subMenu: [
            {
                name: 'menu3-1',
                value: 'menu 3-1',
            },
            {
                name: 'menu3-2',
                value: 'menu 3-2',
            },
            {
                name: 'menu3-3',
                value: 'menu 3-3',
                subMenu: [
                    {
                        name: 'menu3-1-1',
                        value: 'menu 3-1-1',
                    },
                ],
            },
        ],
    },
]);
menu.hide = function() {
    this.classList.add('hide');
};
menu.show = function(pos) {
    this.classList.remove('hide');
    this.changePos(pos)
};
menu.isShow = function() {
    return this.style.getProperty('display') === 'none';
};
menu.changePos = function(pos) {
    let bodyW = document.body.clientWidth,
        bodyH = document.body.clientHeight,
        menuW = menu.clientWidth,
        menuH = menu.clientHeight;

    pos.x = bodyW - pos.x - menuW > 0 ? pos.x : pos.x - menuW;
    pos.y = bodyH - pos.y - menuH > 0 ? pos.y : pos.y - menuH;
    menu.style.left = pos.x + 'px';
    menu.style.top = pos.y + 'px';
};
menu.addEventListener('mouseover', (evt) => {
    console.log(evt);
});

let menuCnt = document.getElementById('j-contextmenu');
menuCnt.appendChild(menu);
menuCnt.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    let x = evt.layerX,
        y = evt.layerY;
    if (!menu.contains(evt.target)) {
        menu.show({
            x: x,
            y: y,
        });
    }
});

menuCnt.addEventListener('click', (evt) => {
    if (!menu.contains(evt.target)) {
        menu.hide();
    }
});
