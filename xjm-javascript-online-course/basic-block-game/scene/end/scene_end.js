class SceneEnd extends WillScene {
    constructor(game) {
        super(game)

        game.registerAction('r', function (e) {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('游戏结束, 按 r 刷新', 100, 290)
    }
}
