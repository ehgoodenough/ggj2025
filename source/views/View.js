import Preact from "preact"
import App from "models/App.js"
import "views/View.less"

import DialogueScreen from "views/DialogueScreen.js"
import OverworldScreen from "views/OverworldScreen.js"
import NavigationErrorScreen from "views/NavigationErrorScreen.js"
import SplashScreen from "views/SplashScreen.js"
import CaveScreen from "views/CaveScreen.js"
import FlashError from "views/FlashError.js"
const Screens = {DialogueScreen, OverworldScreen, NavigationErrorScreen, CaveScreen, SplashScreen, FlashError}

export default class View {
    render() {
        return (
            <div class="View">
                {this.screen}
            </div>
        )
    }
    get screen() {
        const Screen = Screens[App?.navigation?.state?.screen]
        if(Screen != undefined) return <Screen/>
        return (
            <div class="MissingScreen">
                Uh oh!! Something went wrong~ Error 500
            </div>
        )
    }
}
