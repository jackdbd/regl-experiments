import React from "react";
import { MemoryRouter } from "react-router";
import { render } from "react-testing-library";
import ErrorBoundary from "../components/ErrorBoundary";
import OneShotRendering from "../components/OneShotRendering";

describe("OneShotRendering", () => {
  it("renders a helpful error message when WebGL is not supported", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <OneShotRendering />
        </ErrorBoundary>
      </MemoryRouter>
    );
    const errorText =
      "Error: (regl) webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org";
    expect(getByTestId("error-boundary-summary").textContent).toBe(errorText);
  });
});
