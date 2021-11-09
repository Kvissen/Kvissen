import React from "react";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import EnterCodeObserver from "./EnterCode";
import store from "../../stores/QuizStore";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

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

it('should push history', () => {
    const button = screen.getByTestId("entercode-test-button")

    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(mockHistoryPush).toHaveBeenCalledWith("/play-kvis")
});