import Keyb from "keyb"

import Story from "models/Story.js"
import NavigationRouter from "models/NavigationRouter.js"
import NavigationError from "./NavigationError.js"
import storyFile from "stories/example.ink.json"

export default new class App {
    constructor() {
        this.story = new Story(storyFile)

        window.app = this

        this.navigation = new NavigationRouter({
            "defaultPath": "/home"
        })

        this.navigation.on("/dialogue/:dialogueKey", (request) => {
            const dialogueKey = request.wildcards.dialogueKey

            try {
                this.story.startStory(dialogueKey)
            } catch(error) {
                if(error == "not found") {
                    throw new NavigationError("Could not find " + dialogueKey)
                }
            }

            // Audio.trigger("Music")
            this.navigation.state = {"screen": "DialogueScreen", "dialogueKey": dialogueKey}
        })

        this.navigation.on("/overworld", (request) => {
            // Audio.trigger("Music")
            this.navigation.state = {"screen": "OverworldScreen"}
        })

        this.navigation.onNavigationError = (error) => {
            this.navigation.state = {"screen": "NavigationErrorScreen", "error": error}
        }
    }
    update() {
        // this gets run every frame~
    }
}
