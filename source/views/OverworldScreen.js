import Preact from "preact"
import App from "models/App.js"

import "views/OverworldScreen.less"

export default class OverworldScreen {
    render() {
        return (
            <div class="OverworldScreen">
                <div class="World">
                    {this.terrain}
                    <div class="Adventurer" style={{
                        "background-color": "red",
                    }}/>
                </div>
            </div>
        )
    }
    get terrain() {
        if(App.world == undefined) return
        if(App.world.terrain == undefined) return
        const tiles = []
        for(let x = -3; x < 3; x += 1) {
            for(let y = -3; y < 3; y += 1) {
                const xy = (App.player.position.x + x) + "/" + (App.player.position.y + y)
                const terrain = App.world.terrain[xy]
                if(terrain == undefined) continue
                tiles.push(
                    <div class="TerrainTile" style ={{
                        "top": (y + 3) + "em",
                        "left": (x + 3) + "em",
                        "background-color": "#" + terrain.color,
                    }}/>
                )
            }
        }

        return (
            <div class="Terrain">
                {tiles}
            </div>
        )
    }
}
