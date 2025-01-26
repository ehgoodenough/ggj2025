import Ink from "inkjs"

export default class Story {
    constructor(storyFile) {
        this.paragraphs = []
        this.choices = []
        this.pageNumber = 0

        this.ink = new Ink.Story(storyFile)
        this.continueStory()
    }
    update(delta) {
        if(Keyb.isPressed("<space>")) {
            this.time += delta.s
        }
    }
    startStory(dialogueKey) {
        this.paragraphs = []
        this.choices = []
        this.title = undefined
        this.portraitKey = undefined

        try {
            this.ink.ChoosePathString(dialogueKey)
            this.continueStory()
            return
        } catch(error) {
            if(error.name != "StoryException") console.error(error)
            throw "not found"
            return []
        }
    }
    continueStory() {
        // Flip to the next "page"
        this.pageNumber += 1
        this.lineNumber = 0

        this.paragraphs = []

        // Generate story text - loop through available content
        while(this.ink.canContinue) {
            // Get ink to generate the next paragraph
            const text = this.ink.Continue().trim()

            if(text == "" || text == " ") {
                continue
            }
            if(text.startsWith("goto(")) {
                const parameter = text.substring(5, text.length - 1)
                if(parameter.startsWith("www.")) {
                    window.location = "https://" + parameter
                } else {
                    window.location = "/#" + parameter
                }
                continue
            }

            if(text.startsWith("popup(")) {
                const parameter = text.substring(6, text.length - 1)
                window.alert(parameter)
                continue
            }

            if(text.startsWith("image(")) {
                const parameter = text.substring(6, text.length - 1)
                this.portraitKey = parameter
                continue
            }

            if(text.startsWith("title(")) {
                const parameter = text.substring(6, text.length - 1)
                this.title = parameter
                continue
            }

            // Add a paragraph element
            this.paragraphs.push({
                "text": text,
                "pageNumber": this.pageNumber,
                "lineNumber": this.lineNumber++,
            })
        }

        // Create choices from ink choices
        this.choices = this.ink.currentChoices.map((choice) => {
            return {
                "type": "choice",
                "text": choice.text,
                "index": choice.index,
                "pageNumber": this.pageNumber,
                "lineNumber": this.lineNumber++,
            }
        })
    }
    makeChoice(choice) {
        // Tell the story where to go next
        this.ink.ChooseChoiceIndex(choice.index)

        // Aaand loop
        this.continueStory()
    }
}
