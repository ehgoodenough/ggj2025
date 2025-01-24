import Preact from "preact"

import index from "index"

import "views/Mount.view.less"

export default class Mount {
    render() {
        return (
            <div className="Mount">
                <img src={require("images/spacebar.png")}/>
                <div>{index.time.toFixed(3)}s</div>
            </div>
        )
    }
}
