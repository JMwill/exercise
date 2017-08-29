(function(global, menu) {
    global.Menu = menu;
}(window, function(utils) {
    /**
     * 创建个性化菜单文档片段
     *
     * @param {object[]} menu 菜单列表
     * @return {DocumentFragment} 返回创建完成的菜单文档片段
     */
    function Menu(opt) {
        this.baseonElem = opt.baseonElem || document.body;
        this.tmpl = `<div class="menu"></div>`;
        this._elem = utils.parser(this.tmpl);
        this.menuData = opt.menuData;
        this.hide();
        this.init();
    }

    Menu.prototype.hide = function() {
        this._elem.classList.add('hide');
    };
    Menu.prototype.show = function(pos) {
        this._elem.classList.remove('hide');
        this.changePos(pos)
    };
    Menu.prototype.isHide = function() {
        return this._elem.style.getProperty('display') === 'none';
    };
    Menu.prototype.changePos = function(pos) {
        let menu = this._elem,
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

    Menu.prototype.init = function() {
        let md = this.menuData;
        for (let i = 0, il = md.length; i < il; i++) {
            let menuItem = new MenuItem(md[i]);
            this._elem.appendChild(menuItem.getContent());
        }
    }

    Menu.prototype.getContent = function() {
        return this._elem;
    }
    return Menu;
}(utils)));
