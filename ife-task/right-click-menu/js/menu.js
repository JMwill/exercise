(function(global, menu) {
    global.utils = utils;
}(window, function() {
    /**
     * 创建个性化菜单文档片段
     *
     * @param {object[]} menu 菜单列表
     * @param {boolean} isSub 是否是子菜单
     * @return {DocumentFragment} 返回创建完成的菜单文档片段
     */
    function Menu(opt, isSub) {
        this.baseonElem = opt.baseonElem || document.body;
        this.tmpl = `<div class="menu"></div>`;
        this.elem = parser.parseFromString(this.tmpl, 'text/xml').firstChild;
        this.act = opt.act;
        this.menuData = opt.menuData;
        this.hide();
    }

    Menu.prototype.hide = function() {
        this.elem.classList.add('hide');
    };
    Menu.prototype.show = function(pos) {
        this.elem.classList.remove('hide');
        this.changePos(pos)
    };
    Menu.prototype.isHide = function() {
        return this.elem.style.getProperty('display') === 'none';
    };
    Menu.prototype.changePos = function(pos) {
        let menu = this.elem,
            baseon = this.baseonElem;
        let bodyW = baseon.clientWidth,
            bodyH = baseon.clientHeight,
            menuW = menu.clientWidth,
            menuH = menu.clientHeight;

        pos.x = bodyW - pos.x - menuW > 0 ? pos.x : pos.x - menuW;
        pos.y = bodyH - pos.y - menuH > 0 ? pos.y : pos.y - menuH;
        menu.style.left = pos.x + 'px';
        menu.style.top = pos.y + 'px';
    };

    Menu.prototype.install = function() {
        let baseon = this.baseonElem,
            menu = this.elem;
        baseon.addEventListener('contextmenu', (evt) => {
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
        baseon.addEventListener('click', (evt) => {
            if (!menu.contains(evt.target)) {
                menu.hide();
            }
        });
    }

    Menu.prototype.init = function() {
        let md = this.menuData;
        for (let i = 0, il = md.length; i < il; i++) {
            let item = md[i],
                menuItem;
            if (utils.isArray(item.subMenu)) {
                menuItem = new MenuItem({
                    subMenu: item.subMenu,
                }, true);
            } else {
                menuItem = new MenuItem({

                });
            }
            this.elem.appendChild(menuItem.getContent);
        }
    }

    Menu.prototype.getContent = function() {
        return this.elem;
    }
    return Menu;
}));
