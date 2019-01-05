import React from "react";
import { MemoryRouter } from "react-router";
import { render } from "react-testing-library";
import BatchRendering from "../components/BatchRendering";
import ErrorBoundary from "../components/ErrorBoundary";

describe("BatchRendering", () => {
  it("renders a helpful error message when WebGL is not supported", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <BatchRendering
            alpha={1.0}
            drawingBufferHeight={500}
            drawingBufferWidth={500}
          />
        </ErrorBoundary>
      </MemoryRouter>
    );
    const errorText =
      "Error: (regl) webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org";
    expect(getByTestId("error-boundary-summary").textContent).toBe(errorText);
  });
});
