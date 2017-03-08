(function(global) {
    /* Private methods */
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    var _ = {};
    _.define = function(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value       : val,
            enumerable  : !!enumerable,
            writable    : true,
            configurable: true
        });
    }

    /* Emitter */
    var Emitter = function(ctx) {
        this._ctx = ctx || this;
    };
    Emitter.fn = Emitter.prototype;
    Emitter.fn.on = function(evt, fn) {
        this._cbs = this._cbs || {};
        (this._cbs[evt] || (this._cbs[evt] = [])).push(fn);
        return this;
    }
    Emitter.fn.emit = function(evt) {
        this._cbs = this._cbs || {};
        var callbacks = this._cbs[evt];
        var args = [].slice.call(arguments, 1);

        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, l = callbacks.length; i < l; i++) {
                callbacks[i].apply(this, args);
            }
        }

        return this;
    }

    /* Observer实现 */
    var Observer = function(data) {
        if (data &&
            data.hasOwnProperty('$observer') &&
            data.$observer instanceof Observer) {
            
            return data.$observer;
        }
        if (!(this instanceof Observer)) { return new Observer(data); }

        Emitter.call(this);
        this.data = data;
        this.parents = null;

        if (data && isObj(data)) {
            _.define(data, '$observer', this);
            this.walk(data);
        }
    };
    Observer.pathDelimiter = '\b';

    Observer.fn = Observer.prototype = Object.create(Emitter.prototype);
    Observer.fn.walk = function(obj) {
        var val, self = this;
        Object.keys(obj)
        .forEach(function(key) {
            val = obj[key];
            self.observe(key, val);
            self.convert(key, val);
        });
    }

    Observer.fn.observe = function(key, val) {
        var ob = Observer(val);
        if (ob) {
            if (ob.findParent(this) > -1) return;
                (ob.parents || (ob.parents = [])).push({
                ob: this,
                key: key
            });
        }
    }
    Observer.fn.convert = function(key, val) {
        var ob = this;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                printToScreen('你访问了 ' + key); return val;
            },
            set: function(newVal) {
                if (newVal === val) { return; }
                ob.unobserve(val);
                ob.observe(key, newVal);
                ob.notify('set', key, newVal);
                val = newVal;
                printToScreen('你设置了 ' + key + ', 新的值为: ' + JSON.stringify(val));
            }
        });
    }
    Observer.fn.findParent = function(parent, remove) {
        var parents = this.parents;
        if (!parents) return -1;
        var i = parents.length;
        while (i--) {
            var p = parents[i];
            if (p.ob === parent) {
                if (remove) parents.splice(i, 1);
                return i;
            }
        }
        return -1; 
    }
    Observer.fn.unobserve = function(val) {
        if (val && val.$observer) {
            val.$observer.findParent(this, true);
        }
    }
    Observer.fn.notify = function(event, path, val) {
        this.emit(event, path, val);
        if (!this.parents) return;
        for (var i = 0, l = this.parents.length; i < l; i++) {
            var parent = this.parents[i];
            var ob = parent.ob;
            var key = parent.key;
            // 拼装父级的路径
            var parentPath = path
                ? key + Observer.pathDelimiter + path
                : key;
            ob.notify(event, parentPath, val);
        }
    }
    Observer.fn.$watch = function(name, fn) {
        var self = this;
        this.on('set', function(path, val) {
            var pathArr = path.split(Observer.pathDelimiter);
            if (path[0] === name) { fn.call(self, name, val); }
            else if (pathArr.indexOf(name) > -1) { fn.call(self, val); }
        });
    }

    global.CustomObserver = Observer;
    global.Emitter = Emitter;
}(window));

