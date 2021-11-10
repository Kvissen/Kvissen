import React from "react";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import EnterCodeObserver from "../enterCode/EnterCode";
import CreateKvisBox from "./CreateKvisBox";

beforeEach(() => {
    act(() => {
        render(<CreateKvisBox />)
    })
})

it("should contain HTML elements", () => {

    const container = screen.getByTestId("createkvisbox-test-container");
    const kvisname = screen.getByTestId("createkvisbox-test-kvisname");
    const question = screen.getByTestId("createkvisbox-test-question")
    const answers = screen.getAllByTestId("createkvisbox-test-answer");
    const checkboxes = screen.getAllByTestId("createkvisbox-test-checkbox");
    const addQuestion = screen.getByTestId("createkvisbox-test-addquestion");
    const addKvis = screen.getByTestId("createkvisbox-test-done")

    expect(container).toBeTruthy();
    expect(kvisname).toBeTruthy();
    expect(question).toBeTruthy();
    expect(answers.length).toBe(4);
    expect(checkboxes.length).toBe(4);
    expect(addQuestion).toBeTruthy();
    expect(addKvis).toBeTruthy();
})

it('should inflate more questions when added', () => {
    const addQuestion = screen.getByTestId("createkvisbox-test-addquestion");

    expect(addQuestion).toBeTruthy();

    fireEvent.click(addQuestion);

    const answers = screen.getAllByTestId("createkvisbox-test-answer");
    const checkboxes = screen.getAllByTestId("createkvisbox-test-checkbox");

    expect(answers.length).toBe(8);
    expect(checkboxes.length).toBe(8);
});