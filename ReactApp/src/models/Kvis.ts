import {Question} from "./Question";

export class Kvis {
    constructor(
        public uuid: string,
        public name: string = "?",
        public questions: Question[] = []
    ) {}
}