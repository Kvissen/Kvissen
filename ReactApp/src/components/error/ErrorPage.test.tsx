import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import ErrorPage from "./ErrorPage";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}));

beforeEach(() => {
    act(() => {
        render(<ErrorPage/>)
    })
})

it("should show warning html", () => {
    const header = screen.getByTestId("error-test-header");
    const body = screen.getByTestId("error-test-body")

    expect(header).toBeTruthy();
    expect(header.textContent).toBe("Error")

    expect(body).toBeTruthy();
    expect(body.textContent).toBe("An error occurred.")
})