import {Answer} from "./Answer";

export class Question {
    constructor(
        public id: string,
        public answers: Answer[] = [],
        public question: string = "",
        ) {
    }

}