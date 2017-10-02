var Scene = function (game) {
    var s = {
        game: game,
    }
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0

    var blocks = loadLevel(game, 1)

    var paused = false
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    s.draw = function() {
        // draw background
        game.context.fillStyle = '#554'
        game.context.fillRect(0, 0, 400, 300)

        // draw
        game.drawImage(paddle)
        game.drawImage(ball)

        // draw blocks
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].alive) {
                game.drawImage(blocks[i])
            }
        }

        // draw labels
        game.context.fillText('分数：' + score, 10, 290)
    }

    s.pdate = function() {
        ball.move()

        if (paddle.collide(ball)) {
            ball.bounce()
        }
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i].collide(ball)) {
                blocks[i].kill()
                ball.bounce()
                score += 100
            }
        }
    }

    // mouse event

    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(evt) {
        var x = evt.offsetX
        var y = evt.offsetY

        if (ball.hasPoint(x, y)) {
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(evt) {
        var x = evt.offsetX
        var y = evt.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(evt) {
        var x = evt.offsetX
        var y = evt.offsetY
        enableDrag = false
    })

    return s
}