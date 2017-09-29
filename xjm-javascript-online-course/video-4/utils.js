var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersets = function(a, b) {
    var o = a
    if (b.y > a.y && b.y < o.image.height + o.y) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}
