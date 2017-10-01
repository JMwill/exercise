var Scene = function (game) {
    var s = {
        game: game,
    }
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0

    blocks = loadLevel(game, 1)
    s.draw = function() {

    }

    s.update = function() {
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

    return s
}