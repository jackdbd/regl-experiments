import { mount, render } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import TableOfContents from "../components/Home/TableOfContents";

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

describe("App (Enzyme)", () => {
  it("renders three <img>", () => {
    const wrapper = render(<App />);
    expect(wrapper.find("img")).toHaveLength(3);
  });
  it("mounts one <TableOfContents>", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(TableOfContents)).toHaveLength(1);
  });
});
