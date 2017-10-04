var SceneTitle = function (game) {
    var s = {
        game: game,
    }

    game.registerAction('k', function (e) {
        var s = Scene(game)
        game.replaceScene(s)
    })

    s.draw = function() {
        game.context.fillText('按 k 开始游戏', 100, 190)
    }

    s.update = function() {}

    return s
}