import Preact from "preact"
import App from "models/App.js"

import "views/OverworldScreen.less"

let lastMonologue = undefined
const monologue = ("I can’t believe she sent me another letter; doesn’t she know we’re not speaking? / “Yes, mom, I’m angry with you, and no, I don’t want to talk about it. And NO, I’m not acting like a child.” / I am Lord Kass! I don’t need her telling me what to do. / “Think of what all our friends will say if these horrible stories about you don’t stop!” As if I care what the idiots in Meridell think of me. / We’ll see who’s laughing when Deltador’s Domain is under my command instead of that old fool’s. What does she even see in him? / Neopia started going downhill as soon as he showed up. “Oh, I’m the long lost King Deltador, the once and future Neopian.” Look around you! / Our world is disintegrating before our very eyes. And what is our oh-so-great king doing? Chasing his own tail and making cow-eyes at my mother. But not for much longer. / That volcano erupting was a lucky break; now the only way into my castle is through the drawbridge. / No one could cross the Wacky Wocky Woods without first venturing far out into the Techo Mountain Caves to find the antidote. / No one would even know to look there without first defeating the Archmagus at the Temple of Roo! This castle is a fortress, and this treasure room is my sanctuary. / I’ve already beaten down armies at my door once. If a new challenger comes I will face them head on. / The traps are laid, now all I must do is wait. But first, dinner.").split("/")

let lastBlink = undefined
const BLINK_TEXT = [
    "You .. are back where you started?",
    "You seem to teleport when you touch the pink.",
    "You feel a little sick from all the glitching.",
    "You wonder how long this has been bugged.",
    "You blink as the pink fades from your vision.",
    "You remember fondly how Deltador's Domain used to buzz with other players. Now it is quiet and still.",
    "You look around, hoping for something to be different. Anything to be different. But it is just as it always was.",
    "You try to attract the attention of a mod by saying gay, but no such mod appears.",
]

export default class OverworldScreen {
    render() {
        return (
            <div class="OverworldScreen">
                {this.title || <title>Neoquest</title>}
                <div class="World">
                    {this.terrain}
                    <div class="Adventurer"/>
                    <div class="Character" style={{
                        "left": 28 - App.player.position.x + 3 + "em",
                        "top": 15 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/king.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 32 - App.player.position.x + 3 + "em",
                        "top": 10 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/wiz.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 4 - App.player.position.x + 3 + "em",
                        "top": 18 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/wiz.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 23 - App.player.position.x + 3 + "em",
                        "top": 28 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/wiz.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 24 - App.player.position.x + 3 + "em",
                        "top": 21 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/cow.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 43 - App.player.position.x + 3 + "em",
                        "top": 34 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/imp.png") + ")"
                    }}/>
                    <div class="Character" style={{
                        "left": 53 - App.player.position.x + 3 + "em",
                        "top": 31 - App.player.position.y + 3 + "em",
                        "background-image": "url(" + require("images/boatseller.png") + ")"
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
            let interests = terrain.interests.map((interest) => {
                if(interest.text == "SPECIAL"
                && lastMonologue != App.navigation.time) {
                    lastMonologue = App.navigation.time
                    App.navigation.state.interests = App.navigation.state.interests || []
                    App.navigation.state.interests.push(<i>{monologue[0]}</i>)
                    monologue.shift()
                }
                let onClick = interest.link ? () => window.location = "#" + interest.link : undefined
                return (
                    <p class="Interest" link={interest.link} onClick={onClick}>
                        {interest.text == "SPECIAL" ? "" : interest.text}
                    </p>
                )
            })

            if(App.blink != lastBlink) {
                lastBlink = App.blink
                App.navigation.state.interests = App.navigation.state.interests || []
                App.navigation.state.interests.push(BLINK_TEXT[0])
                BLINK_TEXT.push(BLINK_TEXT.shift())
            }

            if(App.navigation.state.interests) {
                interests = interests.concat(App.navigation.state.interests)
            }

            return interests
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
