import {observable, action, computed} from "mobx";
import {persist} from "mobx-persist";

export interface IMobxStore {
    quizId: string;
    quizIdText: string;
    setQuizId(id: string): void;
}

export class MobxStore implements IMobxStore {
    @persist @observable quizId = "X";

    @computed
    public get quizIdText(): string {
        return `ID: ${this.quizId}`
    }

    @action.bound
    public setQuizId(id: string): void {
       this.quizId = id;
    }
}
