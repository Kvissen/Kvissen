export class Question {
    constructor(
        public id: string,
        public answers: string[],
        public question?: string,
        public correctAnswer? : number
        ) {
    }

}