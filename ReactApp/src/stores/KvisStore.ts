// Erlend

import {makeAutoObservable} from 'mobx';
import {makePersistable} from "mobx-persist-store";
import {Kvis} from "../models/Kvis";
import {v4 as uuidv4} from "uuid";
import {Question} from "../models/Question";
import {Answer} from "../models/Answer";
import {Result} from "../models/Result";

class KvisStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'KvisLocalData',
            properties: ["kvisId", "result", "currentKvis", "questionIndex"],
            expireIn: 1800000, // Half hour
            removeOnExpiration: true,
            storage: window.localStorage
        }).then(() => {
            console.log("Created MobX store.")
        });
    }

    // Data
    kvisId: string = ""
    result: Result = new Result()
    currentKvis: Kvis = new Kvis()
    questionIndex = 0

    startQuiz = () => {
        // Update result object with quiz id on start quiz
        this.result.kvisId = this.kvisId
        // Clear old result
        this.result.answerResults = []
        this.questionIndex = 0
        console.log("startQuiz: added id to the quiz")
        // Get quiz on start
        this.getQuiz(this.kvisId)

    }

    addResult = (result: boolean) => {
        this.result.answerResults.push(result)
        console.log("addResult: pushed result of an answer: " + result)
    }

    incrementCurrentQuestion() {
        this.questionIndex++
    }

    // TODO: get quiz from API
    getQuiz(quizId: string) {
        console.log("Mock fetching quiz: " + quizId)
        this.currentKvis = store.currentKvis = new Kvis(uuidv4(), "Test Kvis", uuidv4(), new Date().getDate(), [
            new Question([
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer correct", true),
            ], "Test question"),
            new Question([
                new Answer("Test", false),
                new Answer("Test2", false),
                new Answer("Test3", false),
                new Answer("Test answer correct", true),
            ], "Test question2")
        ])
    }
}

export const store = new KvisStore()
export default store