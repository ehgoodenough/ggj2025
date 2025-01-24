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
    continueStory() {
        // Flip to the next "page"
        this.pageNumber += 1
        this.lineNumber = 0

        // Generate story text - loop through available content
        while(this.ink.canContinue) {
            // Read through each line of this page.
            this.lineNumber += 1

            // Get ink to generate the next paragraph
            const text = this.ink.Continue()

            // Add a paragraph element
            this.paragraphs.push({
                "text": text,
                "lineNumber": this.lineNumber,
                "pageNumber": this.pageNumber,
            })
        }

        // Create choices from ink choices
        this.choices = this.ink.currentChoices.map((choice) => {
            this.lineNumber += 1
            
            return {
                "type": "choice",
                "text": choice.text,
                "index": choice.index,
                "lineNumber": this.lineNumber,
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
