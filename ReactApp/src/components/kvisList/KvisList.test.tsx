import React from "react";
import {act, render, screen} from "@testing-library/react";
import KvisListObserver from "./KvisList";

beforeEach(() => {
    act(() => {
        render(<KvisListObserver/>)
    })
})

it("should contain HTML elements", () => {
    const container = screen.getByTestId("kvislist-test-container");

    expect(container).toBeTruthy();
})