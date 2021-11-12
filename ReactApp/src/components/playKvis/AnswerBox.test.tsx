import React from "react";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import AnswerBox from "./AnswerBox";
import {mockAnswers} from "../../testutil/Mocks";

let clicked = false;
const onMockAnswerSelected = (isCorrect : boolean) => {
    clicked = true;
}

beforeEach(() => {
    // Reset click
    clicked = false

    act(() => {
        render(<AnswerBox answer={mockAnswers[0]} onAnswerSelected={onMockAnswerSelected}/>)
    })
})

it("should contain HTML elements", () => {
    const card = screen.getByTestId("answerbox-test-card");
    const h4 = screen.getByTestId("answerbox-test-h4");

    expect(card).toBeTruthy();
    expect(h4).toBeTruthy();
    expect(h4.textContent).toBe(mockAnswers[0].answer);
})

it('should trigger function onClick', () => {
    const card = screen.getByTestId("answerbox-test-card");

    expect(clicked).toEqual(false);

    fireEvent.click(card);

    expect(clicked).toEqual(true);
});