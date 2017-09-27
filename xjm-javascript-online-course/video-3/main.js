var loadLevel = function (n) {
    var level = levels[n - 1]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }
    window.addEventListener('keyup', function(e) {
        var k = e.key
        if (k === 'p') {
            pause = !pause
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(Number(k))
        }
    })

    document.querySelector('#id-input-speed')
        .addEventListener('input', function(e) {
            input = e.target
            window.fps = Number(input.value)
        })
}
enableDebugMode()

var pause = false
var blocks = []
var __main = function () {
    var paddle = Paddle()
    var game = WillGame(40)
    var ball = Ball()
    var score = 0


    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })
    enableDebugMode(true)

    game.update = function () {
        if (pause) { return }
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].collide(ball)) {
                blocks[i].kill()
                ball.bounce()
                score += 100
            }
        }
        ball.move()
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].alive) {
                game.drawImage(blocks[i])
            }
        }
        game.context.fillText('分数：' + score, 10, 290)
    }
}

__main()