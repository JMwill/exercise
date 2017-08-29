(function(global, menuItem) {
    global.MenuItem = menuItem;
}(window, function(utils) {
    /**
     * MenuItem 类构建
     *
     * @param {object} opt 构建的参数
     */
    function MenuItem(opt) {
        this.name = opt.name;
        this.act = opt.act;
        this._opt = opt;
        this.tmpl =
            `<div class="menu-item">
                <p class="menu-item__name">${this.name}</p>
            </div>`;
        this._elem = utils.parser(this.tmpl);

        this.applyAct();
    };

    /**
     * 设置对应的事件的行为, 并绑定到实例上
     */
    MenuItem.prototype.applyAct = function() {
        Object.keys(this.act)
            .forEach(k => {
                let self = this;
                this._elem.addEventListener(k, function() {
                    let args = Array.prototype.slice.call(arguments, 0);
                    self.act[k].apply(self, args);
                });
            });
    };

    /**
     * 获取实例的 DOM 元素索引
     */
    MenuItem.prototype.getContent = function() {
        return this._elem;
    };

    return MenuItem;
}(utils)));
