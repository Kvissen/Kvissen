// Data class for result of a quiz as stored locally in MobX

export class Result {
    constructor(
        public kvisId: string = "not set",
        public answerResults: boolean[] = []
    ) {
    }
}

export class ResultDTO {
    constructor(id: String = "Not Set",
                kvisId: String,
                name: String | null = "No Name",
                kvisStarted: number,
                kvisEnded: number = new Date().getDate(),
                score: number = -1,
                correctAnswers: number,
                wrongAnswers: number) {
    }
}
