import Preact from "preact"
import App from "models/App.js"

import "views/FlashError.less"

const sadGuy = require("images/ErrorGuy_sad.png")
const winkGuy = require("images/ErrorGuy_wink.png")

var path = sadGuy

function setSad() {
    path = sadGuy
}

function setWink() {
    path = winkGuy
}

export default class FlashError {
    render() {
        return (
            <html>
                <div class = "FlashError">
                    <div class = "ErrorGuy">
                        <img src={path} alt="Error guy"></img>
                    </div>
                    <div class = "ErrorText">
                        <p>Critical error! Adobe Flash no longer exists! <br />
                            <div class="StartButton" onClick={() => window.location.hash = "/overworld"} onMouseOver={setWink} onMouseLeave={setSad}>Send crash report.</div>
                        </p>
                    </div>
                </div>
            </html>
        )
    }
}
