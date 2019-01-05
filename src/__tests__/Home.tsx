import React from "react";
import { MemoryRouter } from "react-router";
import { fireEvent, render, waitForElement } from "react-testing-library";
import Home from "../components/Home";

describe("Home", () => {
  it("renders the Regl logo (a crown)", () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const element = getByAltText("crown");
    const wasClicked = fireEvent.click(element);
    expect(wasClicked).toBeTruthy();
  });
  it("renders the Typescript logo", async () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitForElement(() => getByAltText("Typescript Logo"));
  });
  it("renders the React logo", async () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitForElement(() => getByAltText("React Logo"));
  });
  it("renders the expected text", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitForElement(() => getByText(/Regl Experiments/i));
  });
});
