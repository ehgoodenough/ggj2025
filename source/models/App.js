import Story from "models/Story.js"
import World from "models/World.js"
import Player from "models/Player.js"
import NavigationRouter from "models/NavigationRouter.js"
import NavigationError from "./NavigationError.js"

import storyFile from "data/Neoquest.ink.json"
//import storyFile from "data/test.ink.json"
import tilemapFile from "data/world.tiled.json"
import tilesetFile from "data/tiles/heroes.tileset.json"

const STARTING_POSITION = {"x": 29, "y": 15}

export default new class App {
    constructor() {
        window.App = this

        this.story = new Story(storyFile)
        this.world = new World({
            "tilemap": tilemapFile,
            "tileset": tilesetFile,
        })

        this.player = new Player({
            "position": STARTING_POSITION
        })

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
            this.navigation.state = {"screen": "OverworldScreen"}

            this.player.position.x = Number.parseInt(request.wildcards.x)
            this.player.position.y = Number.parseInt(request.wildcards.y)
            this.player.position.xy = this.player.position.x + "/" + this.player.position.y
            if(this.player.position.x < 0
            || this.player.position.y < 0
            || this.player.position.x >= this.world.width
            || this.player.position.y >= this.world.height
            || this.world.terrain[this.player.position.xy] == undefined) {
                this.player.position = {...STARTING_POSITION}
                this.player.setAddressToPosition()
                this.blink = Date.now()
            }
            if(this.world.terrain[this.player.position.xy] != undefined
            && this.world.terrain[this.player.position.xy].teleport != undefined) {
                this.player.position = {
                    "x": this.world.terrain[this.player.position.xy].teleport.split("/")[0],
                    "y": this.world.terrain[this.player.position.xy].teleport.split("/")[1],
                }
                this.player.setAddressToPosition()
                this.blink = Date.now()
            }
        })

        this.navigation.on("/cave", (request) => {
            // Audio.trigger("Music")
            this.navigation.state = {"screen": "CaveScreen"}
        })

        this.navigation.on("/flash", (request) => {
            // Audio.trigger("Music")
            this.navigation.state = {"screen": "FlashError"}
        })

        this.navigation.onNavigationError = (error) => {
            this.navigation.state = {"screen": "NavigationErrorScreen", "error": error}
        }

        this.navigation.onError = (error) => {
            console.log(error)
        }
    }
    update(delta) {
        this.player.update(delta)
    }
}
