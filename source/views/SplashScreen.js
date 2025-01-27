import Preact from "preact"
import App from "models/App.js"

export default class SplashScreen {
    render() {
        return (
            <div class = "SplashScreen">
                You are the LANDS OF NEWBIEQUEST. Prepare thyself. <div class="StartButton" onClick={this.onClick}>Enter the world of Neopia~</div>
            </div>
        )
    }
    onClick() {
        App.player.name = window.prompt("What is your name, brave adventurer?")
        window.location.hash = "/overworld/29/15"
    }
}
