class SceneTitle extends WillScene {
    constructor(game) {
        super(game)

        game.registerAction('k', function (e) {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }

    draw() {
        this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
