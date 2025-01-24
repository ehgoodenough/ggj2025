import Keyb from "keyb"

export default class Model {
    constructor() {
        this.time = 0
    }
    update(delta) {
        if(Keyb.isPressed("<space>")) {
            this.time += delta.s
        }
    }
}
