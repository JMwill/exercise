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
            paused = !paused
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

var __main = function () {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    var game = WillGame.instance(30, images, function(game) {
        var s = SceneTitle.new(game)
        game.runWithScene(s)
        // var scene = Scene(game)
    })

    enableDebugMode(game, true)
}

__main()