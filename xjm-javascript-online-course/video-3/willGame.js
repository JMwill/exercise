var WillGame = function (images, runCallback) {
    window.fps = 30
    var g = {
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.getElementById('id-canvas')
    var context = canvas.getContext('2d')

    g.context = context
    g.canvas = canvas

    // draw
    g.drawImage = function (gImage) {
        g.context.drawImage(gImage.image, gImage.x, gImage.y)
    }

    window.addEventListener('keydown', function (e) {
        g.keydowns[e.key] = true
    })

    window.addEventListener('keyup', function (e) {
        g.keydowns[e.key] = false
    })

    g.registerAction = function (key, cb) {
        g.actions[key] = cb
    }

    function runloop() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // clear
        context.clearRect(0, 0, g.canvas.width, g.canvas.height)

        // update
        g.update()

        // draw
        g.draw()
        setTimeout(function() {
            runloop()
        }, 1000/fps)
    }

    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            g.images[name] = img
            loads.push(1)
            if (loads.length === names.length) {
                g.run()
            }
        }
    }

    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    g.run = function() {
        runCallback(g)
        setTimeout(function() {
            runloop()
        }, 1000/fps)
    }

    return g
}