import React from "react";
import {act} from "react-dom/test-utils";
import {render} from "@testing-library/react";
import PlayKvisObserver from "./PlayKvis";
import store from "../../stores/KvisStore";

beforeEach(() => {
    store.startQuiz()
    act(() => {
        render(<PlayKvisObserver/>)
    })
})

it("should contain HTML elements", () => {

})