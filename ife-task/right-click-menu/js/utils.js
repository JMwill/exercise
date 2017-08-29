/**
 * 判断对象是否是数组
 *
 * @param {array} a 需要判断的对象
 * @return {boolean} 是否是数组
 */
(function(global, utils) {
    global.utils = utils;
}(window, function() {
    utils = {
        isArray: function(a) {
            return Array.isArray ?
                Array.isArray(a) :
                Object.prototype
                        .toString
                        .call(a)
                        .slice(8)
                        .toLowerCase() === 'array';
        },
        parser: (function() {
            let domParser = document.createElement('div');
            return function(tmpl) {
                try {
                    domParser.innerHTML = tmpl;
                    return domParser.firstElementChild;
                } catch(err) {
                    console.error(err);
                }
            };
        }()),
    };
    return utils;
}()));
