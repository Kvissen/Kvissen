import React from "react";
import {act, render, screen} from "@testing-library/react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";

let mockAnswers = [
    new Answer("testAnswer"),
    new Answer("testAnswer"),
    new Answer("testAnswer"),
    new Answer("testAnswer"),
];

let mockQuestions = [
    new Question(mockAnswers,"testQuestion")
];

let mockKvis = new Kvis(
    "testId",
    "testName",
    "testCreator",
    0,
    mockQuestions
);

beforeEach(() => {
    act(() => {
        render(<KvisListElement kvis={mockKvis}/>)
    })
})

it("should contain HTML elements", () => {
    const container = screen.getByTestId("kvislistelement-test-container");
    const kvisHeader = screen.getByTestId("kvislistelement-test-kvisname-header");
    const questionHeader = screen.getByTestId("kvislistelement-test-questions-header");
    const playButton = screen.getByTestId("kvislistelement-test-play");
    const editButton = screen.getByTestId("kvislistelement-test-edit");

    expect(container).toBeTruthy();

    expect(kvisHeader).toBeTruthy();
    expect(kvisHeader.textContent).toBe("Kvis name")

    expect(questionHeader).toBeTruthy();
    expect(questionHeader.textContent).toBe("Questions")

    expect(playButton).toBeTruthy();
    expect(playButton.textContent).toBe("Start Kvis")

    expect(editButton).toBeTruthy();
    expect(editButton.textContent).toBe("Edit Kvis")
})

it('should assign properties correctly', () => {
    const kvis = screen.getByTestId("kvislistelement-test-kvisname");
    const questions = screen.getByTestId("kvislistelement-test-questions");

    expect(kvis).toBeTruthy();
    expect(kvis.textContent).toBe(mockKvis.name)

    expect(questions).toBeTruthy();
    expect(questions.textContent).toBe(mockKvis.questions.length + " Questions")
    expect(questions).toHaveStyle({margin: 0})
});