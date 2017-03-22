(function(global) {
    var Vue = function(opt) {
        this.pathDelimiter = '\b';
        this.opt = opt;
        this.$el = document.querySelector(opt.el);
        this.tmplStr = this.$el.innerHTML;
        this.$data = opt.data;
        this._varReg = /\{\{([^\}\}])*\}\}/g;
        this._$data = Observer(this.$data);
        this.$data = this._$data.data;

        this.init();
    };

    var p = Vue.prototype;
    p.getUpdateData = function(dataPath) {
        dataPathArr = dataPath.split(this.pathDelimiter);
        var result = this.$data,
            elem;
        for (var i = 0, l = dataPathArr.length; i < l; i++) {
            elem = dataPathArr[i];
            if (result[elem]) {
                result = result[elem];
            } else {
                result = null;
                break;
            }
        }

        return result;
    };
    p.fillData = function(match, index) {
        match =
            match.replace('{{', '')
            .replace('}}', '');
        var args = match.split('.');
        var result = this.$data;
        for (var i = 0, l = args.length; i < l; i++) {
            if (result[args[i]]) {
                result = result[args[i]];
            } else {
                throw new TypeError(args[i] + ' is not exist');
            }
        }
        return result;
    };
    p.updateContent = function(tmpl) {
        this.$el.innerHTML = tmpl;
    };
    p.updateTmplStr = function() {
        this.updateContent(this.tmplStr.replace(this._varReg, this.fillData.bind(this)));
    };

    p.init = function() {
        var self = this;
        this._$data.on('set', function(dataPath, val) {
            var updateData = self.getUpdateData(dataPath);
            if (updateData && updateData !== val) {
                setTimeout(function() {
                    self.updateTmplStr();
                }, 0);
            }
        });
        this.updateTmplStr();
    };
    global.Vue = Vue;
}(window));