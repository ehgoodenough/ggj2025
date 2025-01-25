import Preact from "preact"
import App from "models/App.js"
import "views/View.less"

import DialogueScreen from "views/DialogueScreen.js"
import OverworldScreen from "views/OverworldScreen.js"
import NavigationErrorScreen from "views/NavigationErrorScreen.js"
import SplashScreen from "views/SplashScreen.js"
import Cave from "views/Cave.js"
import FlashError from "views/FlashError.js"
const Screens = {DialogueScreen, OverworldScreen, NavigationErrorScreen, Cave, SplashScreen, FlashError}

export default class View {
    render() {
        const Screen = Screens[App?.navigation?.state?.screen]
        if(Screen != undefined) return <Screen/>
        return (
            <div class="MissingScreen">
                You should not be here!!
            </div>
        )
    }
}
