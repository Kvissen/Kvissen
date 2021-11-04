import {Answer} from "./Answer";

export class Question {
    constructor(
        public answers: Answer[] = [],
        public question: string = "",
        ) {}
}