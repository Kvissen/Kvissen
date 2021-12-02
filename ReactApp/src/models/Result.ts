// Erlend
// Data class for result of a quiz as stored locally in MobX

export class Result {
    constructor(
        public kvisId: string = "not set",
        public startTime: number = new Date().getTime(),
        public answerResults: boolean[] = []
    ) {
    }
}

export class ResultDTO {
    constructor(public id: String = "no uuid set",
                public kvisId: String,
                public name: String | null = "No Name",
                public kvisStarted: number,
                public kvisEnded: number = new Date().getTime(),
                public score: number = -1,
                public correctAnswers: number,
                public wrongAnswers: number) {
    }
}
