import React from "react";
import ReactDOM from "react-dom";
import { render, waitForElement } from "react-testing-library";
import App from "../components/App";

describe("App (jestDom)", () => {
  beforeEach(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const div = document.createElement("div");
    div.setAttribute("id", "root");
    body.appendChild(div);
    ReactDOM.render(<App />, div);
  });
  afterEach(() => {
    // Remove all children to make sure the tests are independent
    const body = document.querySelector("body") as HTMLBodyElement;
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  });
  it("is the only child of the root <div>", () => {
    const root = document.getElementById("root") as HTMLDivElement;
    expect(root.childElementCount).toBe(1);
  });
  it("has a <h1> the expected text content", () => {
    const h1 = document.querySelector("h1");
    const text = "Regl Experiments";
    /* ts complains because it thinks that these matchers are not available. But
     * they are available, because we extended jest in setupJest.js
     */
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(text);
  });
});

describe("App", () => {
  it("renders the expected text", async () => {
    const { getByText } = render(<App />);
    await waitForElement(() => getByText(/Regl experiments/i));
  });
});
