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
            properties: ["kvisCode", "result", "currentKvis",
                "questionIndex", "completedKvis", "completedResult"],
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
    completedResult: Result = new Result()
    currentKvis: Kvis = new Kvis()
    completedKvis: Kvis[] = []
    questionIndex = 0

    startQuiz = () => {
        this.result.answerResults.length = 0
        // Debug print
        console.log("StartQuiz was called. \nCurrentKvis: " +
            this.currentKvis.name + "\nResults length: " +
            this.result.answerResults.length + "\nIndex: " +
            this.questionIndex)

        // Update result object with quiz code on start quiz
        this.result.kvisId = this.currentKvis.uuid // id is not kvisCode!
    }

    // Add the Kvis to completed, remove current
    setKvisCompleted() {
        this.completedKvis.push(this.currentKvis)
        // Refresh
        this.currentKvis = new Kvis("0")
        this.questionIndex = 0
    }

    addResult = (result: boolean) => {
        this.result.answerResults.push(result)
        console.log("addResult: pushed result of an answer: " + result)
    }

    incrementCurrentQuestion() {
        this.questionIndex++
        console.log(store.currentKvis)
    }

    async getQuiz() {
        await KvisRepository.getInstance().getKvisses().then(result => {
            if (result === null || result[0] === null) {
                console.log("Got no result from server. Check validation and network.")
            }
            this.currentKvis = result[0];
            console.log("getQuiz was called. \nCurrentKvis: " +
                this.currentKvis.name + "\nResults length: " +
                this.result.answerResults.length + "\nIndex: " +
                this.questionIndex)
        })
    }

    startMockQuiz() {
        // Update result object with quiz code on start quiz
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