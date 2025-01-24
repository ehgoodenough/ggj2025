import Ink from "inkjs"

export default class Story {
    constructor(storyFile) {
        this.paragraphs = []
        this.choices = []

        this.ink = new Ink.Story(storyFile)
        this.continueStory()
    }
    update(delta) {
        if(Keyb.isPressed("<space>")) {
            this.time += delta.s
        }
    }
    continueStory() {
        var paragraphIndex = 0
        var delay = 0.0

        // Generate story text - loop through available content
        while(this.ink.canContinue) {
            // Get ink to generate the next paragraph
            const text = this.ink.Continue()

            // Create paragraph element
            this.paragraphs.push({"text": text})
        }

        this.choices = []

        // Create choices from ink choices
        this.ink.currentChoices.forEach((choice) => {
            this.choices.push({
                "type": "choice",
                "text": choice.text,
                "index": choice.index,
            })
        })
    }
    makeChoice(choice) {
        // Tell the story where to go next
        this.ink.ChooseChoiceIndex(choice.index)

        // Aaand loop
        this.continueStory()
    }
}
