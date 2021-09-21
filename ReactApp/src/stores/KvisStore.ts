import {action, autorun, computed, makeObservable, observable} from "mobx";

export default class KvisStore {
    quizId: String = ""

    constructor() {
        makeObservable(this, {
            quizId: observable,
            checkedIn: computed,
            checkIn: action,
        });
        autorun(() => console.log("KvisStore ID: " + this.quizId));
    }

    get checkedIn() {
        return this.quizId != ""
    }

    checkIn(quizId: String) {
        this.quizId = quizId
    }
}

export const kvisStore = new KvisStore();