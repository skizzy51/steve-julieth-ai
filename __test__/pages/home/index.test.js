import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "@/pages"
import { act } from "react-dom/test-utils"

describe("Home page", () => {
    beforeEach(() => {
        render(<Home />)
    })

    it("Should render all input tags", () => {
        const inputs = screen.getAllByTestId("input")

        expect(inputs.length).toBe(4)
    })

    it("Should show section names", () => {
        const h3 = screen.getByTestId("h3")
        expect(h3).toBeVisible()
    })
})
