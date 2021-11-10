import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import HeaderObserver from "./Header";
import logo from '../../ImageAssets/kvislogo.png';
import store from "../../stores/QuizStore";

it("should contain HTML elements with expected input", () => {
    act(() => {
        render(<HeaderObserver/>)
    })

    const headerContainer = screen.getByTestId("header-test-container");
    const gridContainer = screen.getByTestId("header-test-grid-container");
    const logoImage = screen.getByTestId("header-test-logo");
    const quizName = screen.getByTestId("header-test-quizname");

    expect(headerContainer).toBeTruthy();

    expect(gridContainer).toBeTruthy();

    expect(logoImage).toBeTruthy();
    expect(logoImage.getAttribute("src")).toBe(logo);

    expect(quizName).toBeTruthy();
})
