if(__STAGE__ === "DEVELOPMENT") {
    require("statgrab/do")
}

import Preact from "preact"
import Yaafloop from "yaafloop"

import View from "views/View.js"
import App from "models/App.js"

let loop = new Yaafloop(function(delta) {
    this.mount = Preact.render(<View/>, document.body, this.mount)
})
