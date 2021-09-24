// Erlend
import { observable, action, computed } from "mobx";
import { persist } from "mobx-persist";

export interface IKvisStore {
  quizId: string;
  quizHeaderText: string;
  setQuizId(quizId: string): void;
}

export class kStore implements IKvisStore {
  @persist @observable quizId = "";

  @computed
  public get quizHeaderText(): string {
    if (this.quizId.length > 0)
    return `Kvis ID: ${this.quizId}`;
    return "Enter Kvis ID to start!"
  }

  @action.bound
  public setQuizId(quizId: string) {
    this.quizId = quizId;
  }
}
