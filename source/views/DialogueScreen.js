import Preact from "preact"
import App from "models/App.js"

import "views/DialogueScreen.less"

const PORTRAITS = {
    "deltador": require("images/king-full.png")
}

export default class DialogueScreen {
    render() {
        return (
            <div class="DialogueScreen">
                {this.title}
                <Story story={App.story}/>
            </div>
        )
    }
    get title() {
        if(App.story.title != undefined) {
            return (
                <title>{App.story.title}</title>
            )
        } else {
            return (
                <title>In Conversation</title>
            )
        }
    }
}

class Story {
    render() {
        return (
            <div class="Story">
                {this.portrait}
                {this.title}
                {App.story.paragraphs.map((paragraph) => {
                    if(paragraph.text.startsWith("goto(")) {
                        const origin = paragraph.text.substring(5, paragraph.text.length - 1)
                        return (
                            <a class="Paragraph" key={paragraph.pageNumber + "/" + paragraph.lineNumber} isCurrentPage={App.story.pageNumber == paragraph.pageNumber} style={this.getStyle(paragraph)}>
                                {origin}
                            </a>
                        )
                    } else {
                        return (
                            <div class="Paragraph" key={paragraph.pageNumber + "/" + paragraph.lineNumber} isCurrentPage={App.story.pageNumber == paragraph.pageNumber} style={this.getStyle(paragraph)}>
                                {paragraph.text}
                            </div>
                        )
                    }
                })}
                {App.story.choices.map((choice) => (
                    <div class="Choice" key={choice.pageNumber + "/" + choice.lineNumber} onClick={this.onClickChoice(choice)} style={this.getStyle(choice)}>
                        > {choice.text}
                    </div>
                ))}
            </div>
        )
    }
    get title() {
        return (
            <div class="Title">{App.story.title}</div>
        )
    }
    get portrait() {
        if(App.story.portraitKey != undefined
        && PORTRAITS[App.story.portraitKey] != undefined) {
            return (
                <img class="Portrait" src={PORTRAITS[App.story.portraitKey]}/>
            )
        }
    }
    onClickChoice(choice) {
        return (event) => {
            event.preventDefault()
            App.story.makeChoice(choice)
        }
    }
    getStyle(paragraph) {
        return {
            "animation-delay": 0.25 + (paragraph.lineNumber * 0.25) + "s"
        }
    }
}
