var Block = function (game, position) {
    var p = position
    var img = game.imageByName('block')
    // var image = imageFromPath('block.png')
    var o = {
        image: img.image,
        x: p[0],
        y: p[1],
        w: img.image,
        h: img.image,
        alive: true,
        lifes: p[2] || 1,
    }

    o.kill = function() {
        o.lifes--
        if (!o.lifes) {
            o.alive = false
        }
    }

    o.collide = function(ball) {
        return o.alive && (rectIntersets(o, ball) || rectIntersets(ball, o))
    }

    return o
}