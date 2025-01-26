import App from "models/App.js"
import Keyb from "keyb"

const DIRECTIONS = {
    "northwest": {"x": -1, "y": -1},
    "northeast": {"x": +1, "y": -1},
    "southwest": {"x": -1, "y": +1},
    "southeast": {"x": +1, "y": +1},
    "north": {"x": 0, "y": -1},
    "south": {"x": 0, "y": +1},
    "west": {"x": -1, "y": 0},
    "east": {"x": +1, "y": 0},
}

export default class Player {
    constructor({position, health = 10}) {
        this.position = {...position}
        this.startingPosition = {...position}

        this.health = health
        this.maxhealth = health

        this.level = 1
    }
    move(directionKey) {
        const direction = DIRECTIONS[directionKey]

        if(direction == undefined) return

        const xy = (this.position.x + direction.x) + "/" + (this.position.y + direction.y)
        if(App.world.terrain[xy] != undefined
        && App.world.terrain[xy].hasCollision == true) {
            return
        }
        if(App.world.terrain[xy] != undefined
        && App.world.terrain[xy].autolink != undefined) {
            window.location = "#/dialogue/" + App.world.terrain[xy].autolink
            return
        }

        if(xy == "48/29" // don't even get me started on this hack
        && App.story.ink.variablesState.$("inventory_boat") == false) {
            return
        }

        if(App.world.terrain[xy].hurt > 0) {
            App.hurt = Date.now()
            App.player.health -= 2 // hardcoded cuz fuck You
            if(App.player.health <= 0) {
                App.player.health = App.player.maxhealth
                this.position = {...this.startingPosition}
                this.setAddressToPosition()
                return
            }
        }

        this.position.x += direction.x
        this.position.y += direction.y
        this.setAddressToPosition()
    }
    setAddressToPosition() {
        window.location = "/#/overworld/" + this.position.x + "/" + this.position.y
    }
    update(delta) {
        if(Keyb.wasJustPressed("A", delta.ms)
        || Keyb.wasJustPressed("<left>", delta.ms)) {
            this.move("west")
        }
        if(Keyb.wasJustPressed("D", delta.ms)
        || Keyb.wasJustPressed("<right>", delta.ms)) {
            this.move("east")
        }
        if(Keyb.wasJustPressed("W", delta.ms)
        || Keyb.wasJustPressed("<up>", delta.ms)) {
            this.move("north")
        }
        if(Keyb.wasJustPressed("S", delta.ms)
        || Keyb.wasJustPressed("<down>", delta.ms)) {
            this.move("south")
        }
    }
}
