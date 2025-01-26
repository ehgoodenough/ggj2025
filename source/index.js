if(__STAGE__ === "DEVELOPMENT") {
    require("statgrab/do")
}

import Preact from "preact"
import Yaafloop from "yaafloop"

import View from "views/View.js"
import App from "models/App.js"

const bigmusic = new Audio(require("music/Neopia City.wav"))
bigmusic.loop = true
const wizmusic = new Audio(require("music/Party Wizard.mp3"))
wizmusic.loop = true;
const quietmusic = new Audio(require("music/Deltador_s Domain.wav"))
quietmusic.loop = true
const kassmusic = new Audio(require("music/Kass's Keep.mp3"))
kassmusic.loop = true

const WIZ_POSITIONS = [[32, 10], [4, 18], [23, 28]]
const WIZ_RADIUS = 5

const CASTLE_ENTRANCES = [[32, 32], [32, 33], [32, 34], [41, 17]]
const CASTLE_EXITS = [[31, 31], [31, 32], [31, 33], [31, 34], [31, 35], [40, 16], [41, 16], [40, 17], [29, 15]]
var inCastle = false

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

    // The wiz song
    var nearWiz = false
    for(var i = 0; i < WIZ_POSITIONS.length; i++) {
        var xDiff = Math.abs(App.player.position.x - WIZ_POSITIONS[i][0])
        var yDiff = Math.abs(App.player.position.y - WIZ_POSITIONS[i][1])
        var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        if(distance < WIZ_RADIUS) {
            wizmusic.play()
            wizmusic.volume = 1.0 - (distance.toFixed(4) / (WIZ_RADIUS).toFixed(4))
            bigmusic.volume = (distance.toFixed(4) / (WIZ_RADIUS).toFixed(4)) / 4.0
            //bigmusic.volume = 0.0
            nearWiz = true
        }
    }

    if(!nearWiz) {
        wizmusic.volume = 0.0
        bigmusic.volume = 1.0
    }

    // Kass's keep song
    // Entrances
    for(var i = 0; i < CASTLE_ENTRANCES.length; i++) {
        if(App.player.position.x == CASTLE_ENTRANCES[i][0] && App.player.position.y == CASTLE_ENTRANCES[i][1]) {
            inCastle = true
            kassmusic.play()
            break;
        }
    }
    // Exits
    for(var i = 0; i < CASTLE_EXITS.length; i++) {
        if(App.player.position.x == CASTLE_EXITS[i][0] && App.player.position.y == CASTLE_EXITS[i][1]) {
            inCastle = false
            kassmusic.pause()
            break;
        }
    }

    if(inCastle) {
        bigmusic.volume = 0.0
    }
})
