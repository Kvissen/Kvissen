import {makeAutoObservable} from 'mobx';
import {makePersistable} from "mobx-persist-store";

// Erlend
// Source: https://github.com/jherr/todos-many-ways/tree/master/todo-mobx

export interface IQuiz {
    id: string;
    name: string;
    qa: string[];    // Pair of Q+A objects. Answers is a list.
}

export class QuizStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'KvisLocalData',
            properties: ["quiz", "quizId"],
            expireIn: 1800000, // Half hour
            removeOnExpiration: true,
            storage: window.localStorage
        }).then(() => {
            console.log("Kvis data persisted " + Date.now())
        });
    }

    quiz: IQuiz = {id: "ABC", name: 'no name', qa: ["question?", "answer!"]}
    quizId: string = ""

    startQuiz = () => {
        this.quiz = {id: this.quizId, name: "new quiz ", qa: ["question?", "answer!"]}
        console.log("Quiz set to " + this.quiz.name + " " + this.quiz.id)
    }
}

export const store = new QuizStore()
export default store