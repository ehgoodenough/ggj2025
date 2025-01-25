import Keyb from "keyb"

import Story from "models/Story.js"
import World from "models/World.js"
import NavigationRouter from "models/NavigationRouter.js"
import NavigationError from "./NavigationError.js"

import storyFile from "data/test.ink.json"
import tilemapFile from "data/world.tiled.json"
import tilesetFile from "data/tiles/heroes.tileset.json" // vmenezio

const STARTING_POSITION = {"x": 7, "y": 5}

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

        this.navigation.on("/overworld/:x/:y", (request) => {
            this.player.position.x = Number.parseInt(request.wildcards.x)
            this.player.position.y = Number.parseInt(request.wildcards.y)
            if(this.player.position.x < 0
            || this.player.position.y < 0
            || this.player.position.x >= this.world.width
            || this.player.position.y >= this.world.height) {
                this.player.position = {...STARTING_POSITION}
                this.setAddressToPosition()
            }
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
    update(delta) {
        if(Keyb.wasJustPressed("A", delta.ms)
        || Keyb.wasJustPressed("<left>", delta.ms)) {
            this.player.position.x -= 1
            this.setAddressToPosition()
        }
        if(Keyb.wasJustPressed("D", delta.ms)
        || Keyb.wasJustPressed("<right>", delta.ms)) {
            this.player.position.x += 1
            this.setAddressToPosition()
        }
        if(Keyb.wasJustPressed("W", delta.ms)
        || Keyb.wasJustPressed("<up>", delta.ms)) {
            this.player.position.y -= 1
            this.setAddressToPosition()
        }
        if(Keyb.wasJustPressed("S", delta.ms)
        || Keyb.wasJustPressed("<down>", delta.ms)) {
            this.player.position.y += 1
            this.setAddressToPosition()
        }
    }
    setAddressToPosition() {
        window.location = "/#/overworld/" + this.player.position.x + "/" + this.player.position.y
    }
}
