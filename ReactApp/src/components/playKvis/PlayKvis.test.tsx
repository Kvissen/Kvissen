import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import PlayKvisObserver from "./PlayKvis";
import store from "../../stores/KvisStore";
import {mockKvis} from "../../testutil/Mocks";

beforeEach(() => {
    store.startMockQuiz();
    act(() => {
        render(<PlayKvisObserver/>)
    })
})

it("should contain HTML elements", () => {
    const container = screen.getByTestId("playkvis-test-container");
    const answerBox = screen.getAllByTestId("playkvis-test-answerbox");

    expect(container).toBeTruthy();
    expect(answerBox).toBeTruthy();
})