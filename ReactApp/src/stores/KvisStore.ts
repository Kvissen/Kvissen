// Erlend

import {makeAutoObservable} from 'mobx';
import {makePersistable} from "mobx-persist-store";
import {Kvis} from "../models/Kvis";
import {Result} from "../models/Result";
import {mockKvis} from "../testutil/Mocks";
import {KvisRepository} from "../data/repositories/KvisRepository";

class KvisStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'KvisLocalData',
            properties: ["kvisCode", "result", "currentKvis", "questionIndex", "completedKvis"],
            expireIn: 1800000, // Half hour
            removeOnExpiration: true,
            storage: window.localStorage
        }).then(() => {
            console.log("Created MobX store.")
        });
    }

    // Data
    kvisCode: string = ""
    result: Result = new Result()
    currentKvis: Kvis = new Kvis()
    completedKvis: Kvis[] = []
    questionIndex = 0

    startQuiz = () => {
        // Update result object with quiz id on start quiz
        this.result.kvisId = this.kvisCode
        // Clear old result
        this.result.answerResults = []
        this.questionIndex = 0
        console.log("startQuiz: added id to the quiz")

        // Get quiz on start
        this.getQuiz()

    }

    // Add the Kvis to completed, remove current
    setKvisCompleted() {
        this.completedKvis.push(this.currentKvis)
        this.currentKvis = new Kvis();
    }

    addResult = (result: boolean) => {
        this.result.answerResults.push(result)
        console.log("addResult: pushed result of an answer: " + result)
    }

    incrementCurrentQuestion() {
        this.questionIndex++
    }

    async getQuiz() {
        await KvisRepository.getInstance().getKvisses().then(result => {
            this.currentKvis = store.currentKvis = result[0];
        })
    }

    startMockQuiz() {
        // Update result object with quiz id on start quiz
        this.result.kvisId = this.kvisCode
        // Clear old result
        this.result.answerResults = []
        this.questionIndex = 0
        console.log("startQuiz: added id to the quiz")
        // Get quiz on start
        this.currentKvis = mockKvis;
    }
}

export const store = new KvisStore()
export default store