var SceneEnd = function (game) {
    var s = {
        game: game,
    }

    game.registerAction('r', function (e) {
        var s = SceneTitle(game)
        game.replaceScene(s)
    })

    s.draw = function() {
        game.context.fillText('游戏结束, 按 r 刷新', 100, 290)
    }

    s.update = function() {
    }

    return s
}