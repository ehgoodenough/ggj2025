import Keyb from "keyb"

import Story from "models/Story.js"
import storyFile from "stories/example.ink.json"

export default new class App {
    constructor() {
        this.story = new Story(storyFile)
    }
    update() {
        // this gets run every frame~
    }
}
