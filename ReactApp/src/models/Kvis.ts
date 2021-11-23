import {Question} from "./Question";
import {Answer} from "./Answer";

export class Kvis {
    constructor(
        public uuid: string = "0",
        public name: string = "?",
        public creator: string = "",
        public ts: number = new Date().getDate(),
        public questions: Question[] = [new Question([new Answer()], "")]
    ) {}
}