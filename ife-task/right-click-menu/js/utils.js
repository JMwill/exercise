/**
 * 判断对象是否是数组
 *
 * @param {array} a 需要判断的对象
 * @return {boolean} 是否是数组
 */
(function(global, utils) {
    global.utils = utils;
}(window, function() {
    utils = {};
    utils.isArray = function(a) {
        return Array.isArray ?
            Array.isArray(a) :
            Object.prototype
                    .toString
                    .call(a)
                    .slice(8)
                    .toLowerCase() === 'array';
    }
    return utils;
}));
