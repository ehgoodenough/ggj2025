if(__STAGE__ === "DEVELOPMENT") {
    require("statgrab/do")
}

import Preact from "preact"
import Yaafloop from "yaafloop"

import View from "views/View.js"
import App from "models/App.js"

const bigmusic = new Audio(require("music/Neopia City.wav"))
bigmusic.loop = true
const quietmusic = new Audio(require("music/Deltador_s Domain.wav"))
quietmusic.loop = true

let loop = new Yaafloop(function(delta) {
    App.update(delta)
    this.mount = Preact.render(<View/>, document.body, this.mount)

    if(App.player.position.x >= 28 && App.player.position.x <= 30
    && App.player.position.y >= 14 && App.player.position.y <= 16) {
        quietmusic.play()
        bigmusic.pause()
    } else {
        bigmusic.play()
        quietmusic.pause()
        quietmusic.currentTime = 0
    }
})
