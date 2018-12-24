import "jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";

describe("App", () => {
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
    expect(root.firstElementChild).toHaveClass("App");
  });
  it("has the expected text content", () => {
    const root = document.getElementById("root") as HTMLDivElement;
    const app = root.firstElementChild;
    const text = "Edit src/App.tsx and save to reload.Learn React";
    expect(app).toHaveTextContent(text);
  });
});
