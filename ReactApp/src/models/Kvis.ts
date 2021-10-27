import {Question} from "./Question";

export class Kvis {
    constructor(
        public id: string,
        public name: string,
        public questions: Question[]
    ) {}
}