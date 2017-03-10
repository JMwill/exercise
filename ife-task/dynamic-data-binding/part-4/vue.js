(function(global) {
    var Vue = function(opt) {
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
        console.log(this.$el);
        console.log(this.$el.innerHTML);
    };
    p.updateTmplStr = function() {
        this.updateContent(this.tmplStr.replace(this._varReg, this.fillData.bind(this)));
    };

    p.init = function() {
        this.updateTmplStr();
    };
    global.Vue = Vue;
}(window));