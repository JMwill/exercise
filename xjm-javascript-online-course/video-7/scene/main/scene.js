class Scene extends WillScene {
    constructor(game) {
        super(game)
        this.setup()
    }

    setup() {
        var game = this.game
        this.bg = WillImage.new(game, 'sky')
        this.player = WillImage.new(game, 'player')
        this.cloud = WillImage.new(game, 'cloud')
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)

        // this.game.registerAction('a', function () {
        //     paddle.moveLeft()
        // })
        // this.game.registerAction('d', function () {
        //     paddle.moveRight()
        // })
        // this.game.registerAction('f', function () {
        //     ball.fire()
        // })
    }

    // draw() {
        // this.game.drawImage(this.bg)
        // this.game.drawImage(this.player)
    // }
}
// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//     var score = 0

//     blocks = loadLevel(game, 1)

//     paused = false
//     s.draw = function() {
//         // draw background
//         game.context.fillStyle = '#554'
//         game.context.fillRect(0, 0, 400, 300)

//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)

//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             if (blocks[i].alive) {
//                 game.drawImage(blocks[i])
//             }
//         }

//         // draw labels
//         game.context.fillText('分数：' + score, 10, 290)
//     }

//     s.update = function() {
//         if (paused) { return }

//         ball.move()

//         if (ball.y > paddle.y) {
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//             return
//         }

//         if (paddle.collide(ball)) {
//             ball.bounce()
//         }
//         for (var i = 0; i < blocks.length; i++) {
//             if (blocks[i].collide(ball)) {
//                 blocks[i].kill()
//                 ball.bounce()
//                 score += 100
//             }
//         }
//     }

//     // mouse event

//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(evt) {
//         var x = evt.offsetX
//         var y = evt.offsetY

//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(evt) {
//         var x = evt.offsetX
//         var y = evt.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(evt) {
//         var x = evt.offsetX
//         var y = evt.offsetY
//         enableDrag = false
//     })

//     return s
// }