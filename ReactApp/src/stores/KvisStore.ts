import {action, autorun, computed, makeObservable, observable} from "mobx";
import React from "react";

export default class KvisStore {

    constructor() {
        makeObservable(this, {
            quizId: observable,
            checkedIn: computed,
            checkIn: action,
        });
        autorun(() => console.log("KvisStore ID: " + this.quizId));
    }

    @observable quizId: String = ""

    get checkedIn() {
        console.log("KvisStore checkedin asked")
        return this.quizId !== ""
    }

    checkIn(quizId: String) {
        console.log("KvisStore Checked into quiz: " + quizId)
        this.quizId = quizId
    }
}

const StoreContext = React.createContext(new KvisStore());
export const useStore = () => React.useContext(StoreContext);