import React from "react";
import {KvisSummary} from "./KvisSummary";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {act} from "react-dom/test-utils";

it("should display text",() => {
    act(() => {
        render(<KvisSummary />);
    })
    const checkText = screen.getByTestId("summary-test-h1")
    expect(checkText.textContent).toBe("You have conquered this Kvis!");
})