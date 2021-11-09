import React from "react";
import { render} from "@testing-library/react";
import  {CreateKvis} from "./CreateKvis";

it("should contain HTML elements", () => {

    const { container } = render(<CreateKvis />)

    const h1 = container.querySelector("h1")
    const button = container.getElementsByClassName("create-kvis-button")[0]

    expect(container.getElementsByClassName("main-container").length).toBe(1)
    expect(h1).toBeTruthy();
    expect(h1?.textContent).toBe("Create a new kvis")
    expect(button).toBeTruthy();
    expect(button.textContent).toBe("Create Kvis")
})