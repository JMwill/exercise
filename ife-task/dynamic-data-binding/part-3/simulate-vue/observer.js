var _ = {};

// 定义一个对象的属性, 默认为不可枚举
_.define = function(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value       : val,
        enumerable  : !!enumerable,
        writable    : true,
        configurable: true
    });
}

// 判定对象是否具有__proto__属性, 是的话直接就赋值给__proto__
if ('__proto__' in {}) {
    _.augment = function(target, proto) {
        target.__proto__ = proto;
    }
} else {
    // 将不可枚举的属性都混合进来, 并复制相应的属性描述符
    _.augment = _.deepMixin = function(to, from) {
        Object
        .getOwnPropertyNames(from)
        .forEach(function(key) {
            var descriptor = Object.getOwnPropertyDescriptor(from, key);
            Object.defineProperty(to, key, descriptor);
        });
    }
}

/**
 * Emitter实现
 */
function Emitter(ctx) {
    this._ctx = ctx || this;
}

var ep = Emitter.prototype;

/**
 * Emitter的on方法实现
 */
ep.on = function(event, fn) {
    this._cbs = this._cbs || {};
    (this._cbs[event] || (this._cbs[event] = []))
        .push(fn)
    return this;
}

p.emit = function(event, a, b, c) {
    this._cbs = this._cbs || {};
    var callbacks = this._cbs[event];

    if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].call(this._ctx, a, b, c);
        }
    }

    return this;
}

/**
 * 扩展自发射器: Emitter对象
 */
function Observer(value) {
    Emitter.call(this);
    // 用于存放需要跟踪的值
    this.value = value;

    // 初始不具备父级
    this.parents = null;

    if (value) {
        // 将自身存放到需要跟踪的值对象当中去, 命名为$ovserver, 且为不可枚举
        _.define(value, '$observer', this);

        /**
         * 加强对象, 这里的objectAugmentations对象是一个普通的Object.prototype对象
         * 但是其内添加了两个方法: 
         * 一个是$add方法, 用来对传进去的值 "绑定监听" 以及执行 "转换操作" 还有发出 "添加" 的消息通知.
         * 一个是$delete方法, 用来"删除"对象的值, 并发出 "删除" 的消息通知
         */
        _.augment(value, objectAugmentations);

        // 遍历要监听的对象
        this.walk(value);
    }
}

Observer.pathDelimiter = '\b';
/**
 * 尝试去为一个值创建一个观察者实例,
 * 如果成功观察, 返回一个新的观察者
 * 或者如果观察者已经存在则返回这个观察者.
 */
Observer.create = function(value) {
    if (value &&
        value.hasOwnProperty('$observer') &&
        value.$observer instanceof Observer) {
        
        return value.$observer;
    }
    return new Observer(value);
}

// 定义prototype为Emitter类型的prototype
var p = Observer.prototype = Object.create(Emitter.prototype);

p.walk = function(obj) {
    var val, self = this;
    // 原有方法是用for...in以及hasOwnProperty组合进行遍历, 但是Object.keys可以达到相同的效果
    Object
    .keys(obj)
    .forEach(function(key) {
        val = obj[key];
        self.observe(key, val);
        self.convert(key, val);
    });
}

// 如果属性是可观察的, 那么就创建一个观察者, 并注册它本身作为它父级注册为一个相关的属性
p.observe = function(key, val) {
    var ob = Observer.create(val);
    if (ob) {
        // 将本身注册为子级观察者的父级
        if (ob.findParent(this) > -1) return;
        (ob.parents || (ob.parents = [])).push({
            ob: this,
            key: key
        });
    }
}

/**
 * 转换属性为getter/setter的形式, 这样才能够在属性被访问/修改时
 * 发出相应事件. 对于以`$`以及`_`开头的属性会被略过
 */
p.convert = function(key, val) {
    var prefix = key.charAt(0);
    if (prefix === '$' || prefix === '_') return;
    var ob = this;
    Object.defineProperty(this.value, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // 是否发送get事件
            if (Observer.emitGet) {
                ob.notify('get', key);
            }
            return val;
        },
        set: function(newVal) {
            if (newVal === val) return;
            ob.unobserve(val);
            ob.observe(key, newVal);
            ob.notify('set', key, newVal);
            val = newVal;
        }
    });
}

/**
 * 取消观察属性, 将它本身从观察者的父级列表中移除
 */
p.unobserve = function(val) {
    if (val && val.$observer) {
        val.$observer.findParent(this, true);
    }
}

/**
 * 查找父选项对象
 */
p.findParent = function(parent, remove) {
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

/**
 * 在自身上发出事件, 并递归地通知父级
 */
p.notify = function(event, path, val, mutation) {
    this.emit(event, path, val, mutation);
    if (!this.parents) return;
    for (var i = 0, l = this.parents.length; i < l; i++) {
        var parent = this.parents[i];
        var ob = parent.ob;
        var key = parent.key;
        // 拼装父级的路径
        var parentPath = path
            ? key + Observer.pathDelimiter + path
            : key;
        ob.notify(event, parentPath, val, mutation);
    }
}