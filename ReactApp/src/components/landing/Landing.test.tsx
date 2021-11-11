import React from "react";
import {act} from "react-dom/test-utils";
import LandingObserver, {Landing} from "./Landing";
import {fireEvent, render, screen} from "@testing-library/react";
import store from "../../stores/KvisStore";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

beforeEach(() => {
    act(() => {
        render(<LandingObserver />)
    })
})

it("should show heading with name", () => {
    const header = screen.getByTestId("landing-test-header-h1")
    const subHeader = screen.getByTestId("landing-test-header-h3")
    expect(header.textContent).toContain("Welcome")
    expect(header.textContent).toContain("Kvis")
    expect(subHeader.textContent).toBe("You have the following options")
});

it("should have list of actions", () => {
    const gridOptions = screen.getByTestId("landing-test-grid-options");
    const addKvis = screen.getByTestId("landing-test-add-kvis");
    const kvisList = screen.getByTestId("landing-test-kvis-list");

    expect(gridOptions).toBeTruthy();
    expect(addKvis).toBeTruthy();
    expect(kvisList).toBeTruthy();
});

it('should navigate when clicked', () => {
    const addKvis = screen.getByTestId("landing-test-add-kvis");
    const kvisList = screen.getByTestId("landing-test-kvis-list");

    fireEvent.click(addKvis);
    expect(mockHistoryPush).toHaveBeenCalledWith('/create-kvis');
    fireEvent.click(kvisList);
    expect(mockHistoryPush).toHaveBeenCalledWith('/kvis-list');
});