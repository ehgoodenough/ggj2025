import Preact from "preact"
import App from "models/App.js"

import "views/OverworldScreen.less"

export default class OverworldScreen {
    render() {
        return (
            <div class="OverworldScreen">
                {this.title || <title>Neoquest</title>}
                <div class="World">
                    {this.terrain}
                    <div class="Adventurer" style={{
                        "background-color": "red",
                    }}/>
                    <div class="Character" style={{
                        "left": 28 - App.player.position.x + 3 + "em",
                        "top": 15 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/king.png") + ")"
                    }}/>
                </div>
                <div class="Controls">
                    <div class="Compass">
                        <img src={require("images/nav.gif")} usemap="#navmap"/>
                        <map name="navmap">
                            <area shape="poly" coords="6,6,39,6,39,11,11,39,6,39" href="javascript:;" onclick={() => App.player.move("northwest")} alt="Northwest"></area>
                            <area shape="poly" coords="60,0,82,22,82,26,36,26,36,21,59,0" href="javascript:;" onclick={() => App.player.move("north")} alt="North"></area>
                            <area shape="poly" coords="112,7,112,39,107,39,79,11,79,7" href="javascript:;" onclick={() => App.player.move("northeast")} alt="Northeast"></area>
                            <area shape="poly" coords="0,59,21,38,26,38,26,83,21,83,0,61" href="javascript:;" onclick={() => App.player.move("west")} alt="West"></area>
                            <area shape="poly" coords="119,61,99,83,93,83,93,37,98,37,119,57" href="javascript:;" onclick={() => App.player.move("east")} alt="East"></area>
                            <area shape="poly" coords="6,113,6,80,11,80,39,108,39,113" href="javascript:;" onclick={() => App.player.move("southwest")} alt="Southwest"></area>
                            <area shape="poly" coords="59,119,37,98,37,93,83,93,83,97,61,119" href="javascript:;" onclick={() => App.player.move("south")} alt="South"></area>
                            <area shape="poly" coords="113,113,80,113,80,109,107,81,113,81" href="javascript:;" onclick={() => App.player.move("southeast")} alt="Southeast"></area>
                            <area shape="circle" coords="59,59,32" href="javascript:;" onclick={() => App.player.move("center")} alt="NeoQuest Manual"></area>
                        </map>
                    </div>
                    <div class="Interests">
                        {this.interests}
                    </div>
                </div>
            </div>
        )
    }
    get title() {
        if(App.world == undefined) return
        if(App.world.terrain == undefined) return
        const xy = App.player.position.x + "/" + App.player.position.y
        const terrain = App.world.terrain[xy]
        if(terrain == undefined) return
        if(terrain.interests == undefined) return
        if(terrain.interests[0] == undefined) return

        return (
            <title>
                {terrain.interests[terrain.interests.length - 1].text}
            </title>
        )
    }
    get interests() {
        if(App.world == undefined) return
        if(App.world.terrain == undefined) return
        const xy = App.player.position.x + "/" + App.player.position.y
        const terrain = App.world.terrain[xy]
        if(terrain == undefined) return
        if(terrain.interests == undefined) return
        if(terrain.interests[0] == undefined) return

        if(terrain.interests instanceof Array) {
            return terrain.interests.map((interest) => {
                let onClick = interest.link ? () => window.location = "#" + interest.link : undefined
                return (
                    <p class="Interest" link={interest.link} onClick={onClick}>
                        {interest.text}
                    </p>
                )
            })
        }
    }
    get terrain() {
        if(App.world == undefined) return
        if(App.world.terrain == undefined) return
        const tiles = []
        for(let x = -3; x <= 3; x += 1) {
            for(let y = -3; y <= 3; y += 1) {
                const xy = (App.player.position.x + x) + "/" + (App.player.position.y + y)
                const terrain = App.world.terrain[xy]
                if(terrain == undefined) continue
                tiles.push(
                    <div class="TerrainTile" style ={{
                        "top": (y + 3) + "em",
                        "left": (x + 3) + "em",
                        "background-color": "#" + terrain.color,
                        "background-image": terrain.image && "url(" + terrain.image + ")"
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
