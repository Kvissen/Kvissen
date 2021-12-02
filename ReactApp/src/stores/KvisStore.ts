// Erlend

import {makeAutoObservable} from 'mobx';
import {makePersistable} from "mobx-persist-store";
import {Kvis} from "../models/Kvis";
import {Result, ResultDTO} from "../models/Result";
import {mockKvis} from "../testutil/Mocks";
import {KvisRepository} from "../data/repositories/KvisRepository";
import ResultDao from "../data/daos/ResultDao";

class KvisStore {

    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'KvisLocalData',
            properties: ["kvisCode", "result", "currentKvis",
                "questionIndex", "completedKvis", "currentUser"],
            expireIn: 1800000, // Half an hour
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
    currentUser = "Unknown"

    startQuiz = async () => {
        this.result = new Result(undefined, undefined, [])
        this.questionIndex = 0
        this.currentKvis = new Kvis()
        await this.getActivatedKvis().then(
            () => {
                // Update result object with quiz code on start quiz
                this.result.kvisId = this.currentKvis.uuid // id is not kvisCode!
            })
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
    }

    incrementCurrentQuestion() {
        this.questionIndex++
    }

    async getActivatedKvis() {
        await KvisRepository.getInstance().getActivatedKvis(this.kvisCode)
            .then(result => {
                if (result == null) {
                    return;
                }
                this.currentKvis = result;
            })
    }

    startMockQuiz() {
        // Update result object with quiz code on start quiz
        this.result.kvisId = this.kvisCode
        // Clear old result
        this.result.answerResults = []
        this.questionIndex = 0
        // Get quiz on start
        this.currentKvis = mockKvis;
    }

    submitResults() {
        var right = 0
        var wrong = 0

        this.result.answerResults.forEach((result) => {
            if (result) {
                right++
            } else {
                wrong++
            }
        })

        // Note: Undefined means 'use default value' here
        const result = new ResultDTO(
            undefined,
            this.result.kvisId,
            undefined,
            this.result.startTime,
            undefined,
            undefined,
            right,
            wrong
        )

        console.log("submitResults: I'm sending ")
        console.log(result)

        ResultDao.getInstance().addResults(result).then(
            (response) => {
                console.log("KvisStore.submitResults: " + response)
            }
        )
    }
}

export const store = new KvisStore()
export default store