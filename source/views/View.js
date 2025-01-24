import Preact from "preact"
import App from "models/App.js"
import "views/View.less"

export default class View {
    render() {
        return (
            <div className="View">
                <Story story={App.story}/>
            </div>
        )
    }
}

class Story {
    render() {
        return (
            <div class="Story">
                {App.story.paragraphs.map((paragraph) => (
                    <div class="Paragraph">
                        {paragraph.text}
                    </div>
                ))}
                {App.story.choices.map((choice) => (
                    <div class="Choice" onClick={this.onClickChoice(choice)}>
                        {choice.text}
                    </div>
                ))}
            </div>
        )
    }
    onClickChoice(choice) {
        return (event) => {
            event.preventDefault()
            App.story.makeChoice(choice)
        }
    }
}
