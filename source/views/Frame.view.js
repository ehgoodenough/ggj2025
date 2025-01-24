import Preact from "preact"

import "views/Frame.view.less"

export default class Frame {
    render() {
        return (
            <div className="Frame" id="frame">
                {this.props.children}
            </div>
        )
    }
}
