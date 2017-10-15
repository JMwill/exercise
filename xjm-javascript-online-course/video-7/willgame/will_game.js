class WillGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.getElementById('id-canvas')
        this.context = this.canvas.getContext('2d')

        // events
        var self = this

        window.addEventListener('keydown', function (e) {
            self.keydowns[e.key] = true
        })

        window.addEventListener('keyup', function (e) {
            self.keydowns[e.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }

    // update
    update() {
        this.scene.update()
    }

    // draw
    draw() {
        this.scene.draw()
    }

    registerAction(key, cb) {
        this.actions[key] = cb
    }

    runloop() {
        // events
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // update
        this.update()

        // draw
        this.draw()
        setTimeout(() => {
            this.runloop()
        }, 1000/fps)
    }

    init() {
        var loads = []
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            let path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name] = img
                loads.push(1)
                if (loads.length === names.length) {
                    this.run()
                }
            }
        }
    }

    textureByName(name) {
        var img = this.images[name]
        // var image = {
        //     w: img.width,
        //     h: img.height,
        //     image: img,
        // }
        return img
    }


    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000/fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    run(scene) {
        this.runCallback(this)
    }

}