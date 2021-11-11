import React from "react";
import {act} from "react-dom/test-utils";
import {render} from "@testing-library/react";
import PlayKvisObserver from "./PlayKvis";



beforeEach(() => {
    act(() => {
        render(<PlayKvisObserver/>)
    })
})

it("should contain HTML elements", () => {

})