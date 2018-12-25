import { mount } from "enzyme";
import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Regl from "../components/Regl";

describe("Regl", () => {
  it("calls componentDidMount once", () => {
    const spy = jest.spyOn(Regl.prototype, "componentDidMount");
    mount(
      <ErrorBoundary>
        <Regl />
      </ErrorBoundary>
    );
    expect(Regl.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
