import React from "react";
import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import DropDownMenu from "./DropDownMenu";
import {shallow} from "enzyme";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

beforeEach(() => {
    act(() => {
        render(<DropDownMenu/>)
    })
})

it("should contain HTML elements", () => {

    const container = screen.getByTestId("dropdown-test-container");
    const openButton = screen.getByTestId("dropdown-test-button-open");

    expect(container).toBeTruthy();

    expect(openButton).toBeTruthy();
    expect(openButton.textContent).toBe("Create & Manage");

})

it('should open onclick', () => {
    const openButton = screen.getByTestId("dropdown-test-button-open")

    expect(openButton).toBeTruthy();

    fireEvent.click(openButton);

    const menu = screen.getByTestId("dropdown-test-menu")
    const loginButton = screen.getByTestId("dropdown-test-menu-login")

    expect(menu).toBeTruthy();
    expect(loginButton).toBeTruthy();
});

it('should redirect when login is clicked', () => {
    const openButton = screen.getByTestId("dropdown-test-button-open");

    fireEvent.click(openButton);

    const loginButton = screen.getByTestId("dropdown-test-login");

    fireEvent.click(loginButton);

    expect(mockHistoryPush).toHaveBeenCalledWith("/login-redirect")
});