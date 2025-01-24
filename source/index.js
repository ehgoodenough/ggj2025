if(__STAGE__ === "DEVELOPMENT") {
    require("statgrab/do")
}

import Preact from "preact"
import Yaafloop from "yaafloop"

import Mount from "views/Mount.view.js"

import Model from "models/Model.js"
const model = new Model()
export default model

let loop = new Yaafloop(function(delta) {
    model.update(delta)
    this.mount = Preact.render(<Mount/>, document.body, this.mount)
})
