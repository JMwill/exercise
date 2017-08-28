(function(global, menuItem) {
    global.MenuItem = MenuItem;
}(window, function() {
    /**
     * MenuItem 类构建
     *
     * @param {object} opt 构建的参数
     * @param {boolean} hasSub 是否包含子菜单
     */
    function MenuItem(opt, hasSub) {
        this.tmpl =
            `<div class="menu-item ${hasSub ? 'i-r-arrow' : ''}">
                <p class="menu-item__name">${opt.name}</p>
            </div>`;
        this.elem = this.parser.parseFromString(this.tmpl, 'text/xml').firstChild;
        this.act = opt.act;

        // 将子菜单添加到实例上
        if (hasSub) { this.subMenu = opt.subMenu; }
    };
    MenuItem.prototype.parser = new DOMParser();

    /**
     * 设置对应的事件的行为, 并绑定到实例上
     */
    MenuItem.prototype.applyAct = function() {
        Object.keys(this.act)
            .forEach(k => {
                this.elem.addEventListener(k, () => {
                    let args = Array.prototype.slice.call(arguments, 0);
                    this.act[k].apply(this, args);
                });
            });
    };

    /**
     * 获取实例的 DOM 元素索引
     */
    MenuItem.prototype.getContent = function() {
        return this.elem;
    };

    return MenuItem;
}));
