class WillScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    static new(game) {
        return new this(game)
    }

    addElement(img) {
        this.elements.push(img)
    }

    draw() {
        this.elements.forEach((e) => {
            this.game.drawImage(e)
        })
    }
    update() {}
}
