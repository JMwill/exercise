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
var blocks = []
var __main = function () {
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = WillGame(images, function(g) {
        var paddle = Paddle(game)
        var ball = Ball(game)
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
        enableDebugMode(game, true)

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
    })
}

__main()