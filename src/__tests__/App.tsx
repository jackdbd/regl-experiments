import { mount, render } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import ErrorBoundary from "../components/ErrorBoundary";
import Regl from "../components/Regl";

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
  it("has the expected text content", () => {
    const h1 = document.querySelector("h1");
    const text = "Regl in React";
    expect(h1).toHaveTextContent(text);
  });
});

describe("App (Enzyme)", () => {
  it("has one <img>", () => {
    const wrapper = render(<App />);
    expect(wrapper.find("img")).toHaveLength(1);
  });
  it("renders <ErrorBoundary> in place of <Regl>", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(ErrorBoundary)).toHaveLength(2);
    expect(wrapper.find(Regl)).toHaveLength(0);
  });
});
