import React from "react";
import {act} from "react-dom/test-utils";
import {render} from "@testing-library/react";
import LandingObserver from "../landing/Landing";
import DropDownMenu from "./DropDownMenu";
import {shallow} from "enzyme";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

it("should", () => {
    const wrapper = shallow(<DropDownMenu />)

})