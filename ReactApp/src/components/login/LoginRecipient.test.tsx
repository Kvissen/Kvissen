import React from "react";
import {render, screen} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import LoginRedirect from "./LoginRedirect";
import LoginRecipientObserver from "./LoginRecipient";
import LoginRecipient from "./LoginRecipient";



jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}));

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
        render(<LoginRecipient />);
    })
})


it("should show login recipient layout", () => {
    const container = screen.getByTestId("loginrecipient-test-container");
    const progress  = screen.getByTestId("loginrecipient-test-progress");
    const h2 = screen.getByTestId("loginrecipient-test-h2");

    expect(container).toBeTruthy();
    expect(progress).toBeTruthy();
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe("Redirecting to dashboard...");
});