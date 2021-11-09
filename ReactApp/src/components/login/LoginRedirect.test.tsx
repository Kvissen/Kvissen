import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import LoginRedirectObserver from "./LoginRedirect";
import LoginRedirect from "./LoginRedirect";

window = Object.create(window);
const url = "https://dummy.com";
Object.defineProperty(window, 'location', {
    value: {
        href: url
    },
    writable: true
});
beforeEach(() => {

    act(() => {
        render(<LoginRedirect />);
    })
})

it("should show login redirect layout", () => {
    const container = screen.getByTestId("loginredirect-test-container");
    const progress  = screen.getByTestId("loginredirect-test-progress");
    const h2 = screen.getByTestId("loginredirect-test-h2");

    expect(container).toBeTruthy();
    expect(progress).toBeTruthy();
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe("Redirecting to login page...");
});