import React from "react";
import {KvisSummary} from "./KvisSummary";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("should display text",() => {
    render(<KvisSummary />);

    const checkText = screen.getByTestId("summary-test-h1")
    expect(checkText.textContent).toBe("You are done with the Kvis");
})