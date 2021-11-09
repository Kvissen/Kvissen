// Erlend

import {makeAutoObservable} from 'mobx';
import {makePersistable} from "mobx-persist-store";

// Data class for result of a quiz as stored locally in MobX
export class Result {
    constructor(
        public quizId: string = "not set",
        public points: boolean[] = []
    ) {
    }
}

export class QuizStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'KvisLocalData',
            properties: ["quizId", "result"],
            expireIn: 1800000, // Half hour
            removeOnExpiration: true,
            storage: window.localStorage
        }).then(() => {
            console.log("Kvis data persisted " + Date.now())
        });
    }

    // Data
    quizId: string = ""
    result: Result = new Result()

    startQuiz = () => {
        // Update result object with quiz id on start quiz
        this.result.quizId = this.quizId
        console.log("startQuiz: added id to the quiz")
    }

    addResult = (result: boolean) => {
        this.result.points.push(result)
        console.log("addResult: pushed result of an answer: " + result)
    }
}

export const store = new QuizStore()
export default store