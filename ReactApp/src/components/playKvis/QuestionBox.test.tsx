import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import QuestionBox from "./QuestionBox";
import {mockQuestions} from "../../testutil/Mocks";

beforeEach(() => {
    act(() => {
        render(<QuestionBox question={mockQuestions[0]}/>);
    });
})

it("should contain HTML elements and content", () => {

    const card = screen.getByTestId("questionbox-test-card");
    const h2 = screen.getByTestId("questionbox-test-h2");

    expect(card).toBeTruthy();

    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe(mockQuestions[0].question);

})