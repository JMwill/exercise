var loadLevel = function (game, n) {
    var level = levels[n - 1]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.addEventListener('keyup', function(e) {
        var k = e.key
        if (k === 'p') {
            pause = !pause
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })

    document.querySelector('#id-input-speed')
        .addEventListener('input', function(e) {
            input = e.target
            window.fps = Number(input.value)
        })
}

var pause = false
var __main = function () {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = WillGame(images, function(g) {
        enableDebugMode(game, true)
        var scene = Scene()

        game.update = function () {
            if (paused) { return }

            // s.update
            scene.update()
        }

        game.draw = function () {

            // s.draw
            scene.draw()
        }
    })
}

__main()