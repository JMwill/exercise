var Ball = function (game) {
    // var image = imageFromPath('ball.png')
    // var o = {
    //     image: image,
    //     x: 99,
    //     y: 170,
    //     speedX: 10,
    //     speedY: 10,
    //     fired: false,
    // }
    var o = game.imageByName('ball')
    o.x = 90
    o.y = 170
    o.speedX = 10,
    o.speedY = 10,
    o.fired = false,

    o.fire = function() {
        o.fired = true
    }

    o.move = function() {
        if (!o.fired) {
            return
        }

        if (o.x <= 0 || o.x + o.image.width >= 400) {
            o.speedX *= -1
            o.x = o.x <= 0 ? 0 : 400 - o.image.width
        }

        if (o.y <= 0 || o.y + o.image.height >= 300) {
            o.speedY *= -1
            o.y = o.y <= 0 ? 0 : 300 - o.image.height
        }

        o.y += o.speedY
        o.x += o.speedX;
    }

    o.bounce = function() {
        o.speedY *= -1
    }

    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }

    return o
}