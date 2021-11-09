import React from "react";
import {act} from "react-dom/test-utils";
import {render} from "@testing-library/react";
import EnterCodeObserver from "../enterCode/EnterCode";
import CreateKvisBox from "./CreateKvisBox";

beforeEach(() => {
    act(() => {
        render(<CreateKvisBox />)
    })
})

it("should contain HTML elements", () => {

})