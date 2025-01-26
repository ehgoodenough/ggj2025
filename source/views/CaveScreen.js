import Preact from "preact"
import App from "models/App.js"

import "views/CaveScreen.less"

export default class Cave {
    render() {
        return (
            <div class="CaveScreen">
                <div class="Echo">
                    There's nothing in here;<br/>use the back button!
                </div>
            </div>
        )
    }
}
