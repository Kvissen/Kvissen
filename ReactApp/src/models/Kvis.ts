import {Question} from "./Question";

export class Kvis {
    constructor(
        public uuid: string,
        public name: string = "",
        public creator: string ="",
        public ts : number = new Date().getDate(),
        public questions: Question[] = []
    ) {}
}