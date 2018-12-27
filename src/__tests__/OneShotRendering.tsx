import { mount, render } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";
import ErrorBoundary from "../components/ErrorBoundary";
import OneShotRendering from "../components/OneShotRendering";

describe("OneShotRendering", () => {
  it("renders one <h1>", () => {
    const wrapper = render(
      <MemoryRouter>
        <OneShotRendering />
      </MemoryRouter>
    );
    expect(wrapper.find("h1")).toHaveLength(1);
  });
  it("has one <ErrorBoundary> in place of <OneShotRendering>", () => {
    const wrapper = mount(
      <MemoryRouter>
        <ErrorBoundary>
          <OneShotRendering />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
    expect(wrapper.find(OneShotRendering)).toHaveLength(0);
  });
  it("mounts no <canvas> when it fails (WebGL not supported)", () => {
    const wrapper = mount(
      <MemoryRouter>
        <ErrorBoundary>
          <OneShotRendering />
        </ErrorBoundary>
      </MemoryRouter>
    );
    expect(wrapper.find("canvas")).toHaveLength(0);
  });
});
