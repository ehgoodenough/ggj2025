import Keyb from "keyb"

import Story from "models/Story.js"
import World from "models/World.js"
import NavigationRouter from "models/NavigationRouter.js"
import NavigationError from "./NavigationError.js"

import storyFile from "data/test.ink.json"
import tilemapFile from "data/world.tiled.json"
import tilesetFile from "data/tiles/heroes.tileset.json" // vmenezio

export default new class App {
    constructor() {
        window.App = this

        this.story = new Story(storyFile)
        this.world = new World({
            "tilemap": tilemapFile,
            "tileset": tilesetFile,
        })

        this.player = {
            "position": {
                "x": 5,
                "y": 9,
            }
        }

        this.navigation = new NavigationRouter({
            "defaultPath": "/splash"
        })

        this.navigation.on("/splash", (request) => {
            this.navigation.state = {"screen": "SplashScreen"}
        })

        this.navigation.on("/dialogue/:dialogueKey", (request) => {
            const dialogueKey = request.wildcards.dialogueKey

            this.story.paragraphs = []
            this.story.choices = []

            try {
                this.story.startStory(dialogueKey)
            } catch(error) {
                if(error == "not found") {
                    throw new NavigationError("Could not find " + dialogueKey)
                }
            }

            this.navigation.state = {"screen": "DialogueScreen", "dialogueKey": dialogueKey}
        })

        this.navigation.on("/overworld", (request) => {
            this.navigation.state = {"screen": "OverworldScreen"}
        })

        this.navigation.on("/cave", (request) => {
            // Audio.trigger("Music")
            this.navigation.state = {"screen": "Cave"}
        })

        this.navigation.onNavigationError = (error) => {
            this.navigation.state = {"screen": "NavigationErrorScreen", "error": error}
        }
    }
    update() {
        if(Keyb.wasJustPressed("A")
        || Keyb.wasJustPressed("<left>")) {
            this.player.position.x -= 1
        }
        if(Keyb.wasJustPressed("D")
        || Keyb.wasJustPressed("<right>")) {
            this.player.position.x += 1
        }
        if(Keyb.wasJustPressed("W")
        || Keyb.wasJustPressed("<up>")) {
            this.player.position.y -= 1
        }
        if(Keyb.wasJustPressed("S")
        || Keyb.wasJustPressed("<down>")) {
            this.player.position.y += 1
        }
    }
}
