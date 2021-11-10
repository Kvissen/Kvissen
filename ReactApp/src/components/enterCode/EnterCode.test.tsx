import React from "react";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import EnterCodeObserver from "./EnterCode";
import store from "../../stores/QuizStore";

const mockHistoryPush = jest.fn();

beforeEach(() => {
    act(() => {
        render(<EnterCodeObserver />)
    })
})

it("should contain container and textfield", () => {
    const container = screen.getByTestId("entercode-test-container");
    const textField = screen.getByTestId("entercode-test-textfield")

    expect(container).toBeTruthy();
    expect(container.children.length).toBe(3)
    expect(textField).toBeTruthy();
    expect(textField.title).toBe(store.quizId)
})