import {Answer} from "../models/Answer";
import {Question} from "../models/Question";
import {Kvis} from "../models/Kvis";

export const mockAnswers = [
    new Answer("testAnswer"),
    new Answer("testAnswer"),
    new Answer("testAnswer"),
    new Answer("testAnswer"),
];

export const mockQuestions = [
    new Question(mockAnswers,"testQuestion")
];

export const mockKvis = new Kvis(
    "testId",
    "testName",
    "testCreator",
    0,
    mockQuestions
);