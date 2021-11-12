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
        this.getQuiz()

    }

    addResult = (result: boolean) => {
        this.result.answerResults.push(result)
        console.log("addResult: pushed result of an answer: " + result)
    }

    incrementCurrentQuestion() {
        this.questionIndex++
    }

    // TODO: get quiz from API
    async getQuiz() {
        await KvisRepository.getInstance().getKvisses().then(result => {
            this.currentKvis = store.currentKvis = result[0];
            window.location.href = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_AUTH_PLAYER + store.kvisId
        })
    }

    startMockQuiz() {
        // Update result object with quiz id on start quiz
        this.result.kvisId = this.kvisId
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