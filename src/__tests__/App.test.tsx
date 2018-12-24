import { mount } from "enzyme";
import "jest-dom/extend-expect";
import React from "react";
import ReactDOM from "react-dom";
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
    expect(root.firstElementChild).toHaveClass("App");
  });
  it("has the expected text content", () => {
    const root = document.getElementById("root") as HTMLDivElement;
    const app = root.firstElementChild;
    const text = "Edit src/App.tsx and save to reload.Learn React";
    expect(app).toHaveTextContent(text);
  });
});

describe("App (Enzyme)", () => {
  it("has the expected number of <Card> components", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("a")).toHaveLength(1);
  });
  it("has <a> eith expected props", () => {
    const wrapper = mount(<App />);
    const a = wrapper.find("a");
    expect(a.props()).toHaveProperty("target");
  });
  it.skip("calls componentDidMount once", () => {
    const spy = jest.spyOn(App.prototype, "componentDidMount");
    mount(<App />);
    expect(App.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
