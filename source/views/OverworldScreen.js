import Preact from "preact"
import App from "models/App.js"

import "views/OverworldScreen.less"

export default class OverworldScreen {
    render() {
        return (
            <div class="OverworldScreen">
                <div class="World">
                    {this.terrain}
                </div>
            </div>
        )
    }
    get terrain() {
        if(App.world == undefined) return
        if(App.world.terrain == undefined) return
        const tiles = []
        for(let x = 0; x < 7; x += 1) {
            for(let y = 0; y < 7; y += 1) {
                if(App.world.terrain[x + "/" + y] == undefined) continue
                const terrain = App.world.terrain[x + "/" + y]
                tiles.push(
                    <div class="TerrainTile" style ={{
                        "top": x + "em",
                        "left": y + "em",
                        "background-color": "orange",
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
