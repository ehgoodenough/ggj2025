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
    constructor({position}) {
        this.position = position
    }
    move(directionKey) {
        const direction = DIRECTIONS[directionKey]

        if(direction == undefined) return

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
