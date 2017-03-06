(function(global) {
    var printScreen = document.querySelector('.print-screen');
    function printToScreen(msg) {
        var span = document.createElement('span');
        var br = document.createElement('br');
        span.innerText = msg;
        printScreen.appendChild(span);
        printScreen.appendChild(br);
        scrollToBottom(printScreen);
    }
    function scrollToBottom(elem) {
        elem.scrollTop = elem.scrollHeight;
    }

    var Observer = function(data) {
        if (!(this instanceof Observer)) { return new Observer(data); }
        return this.init(data);
    };

    /* Private methods */
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    function observerProperty(obj, data) {
        Object.keys(data)
            .forEach(function(key) {
                var val = data[key];
                Object.defineProperty(obj, key, {
                    enumerable: true,
                    configurable: true,
                    get: function() {
                        printToScreen('你访问了 ' + key); return val;
                    },
                    set: function(newVal) {
                        if (isObj(newVal)) {
                            val = Object.create(null);
                            observerProperty(val, newVal);
                        } else {
                            val = newVal;
                        }
                        printToScreen('你设置了 ' + key + ', 新的值为: ' + JSON.stringify(val));
                    }
                });
                if (isObj(data[key])) { observerProperty(obj[key], data[key]); }
            });
    }
    
    /* prototype methods */
    Observer.fn = Observer.prototype;
    Observer.fn.init = function(data) {
        observerObj = Object.create(null);
        observerProperty(observerObj, data);
        return observerObj
    };

    global.CustomObserver = Observer;
}(window));

