import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-testing-library";
import REGL from "regl";

interface IRouterOptions {
  history: MemoryHistory<any>;
  route: string;
}

const defaultRouterOptions: IRouterOptions = {
  history: createMemoryHistory({ initialEntries: ["/"] }),
  route: "/",
};

/**
 * `react-testing-library`'s `render` function with a React Router in context.
 * This function is useful for all components that assume a React Router being
 * available in context (e.g. a component which uses the `<Link />` component
 * from `react-router-dom`).
 *
 * @param ui The react component to test
 * @param options Options for the router
 */
export const renderWithRouter = (
  ui: React.ReactElement<any>,
  options: IRouterOptions = defaultRouterOptions
) => {
  const renderResult = render(<Router history={options.history}>{ui}</Router>);
  const testingUtilities = {
    ...renderResult,
    // add `history` to the returned testing utilities to allow us to reference
    // it in our tests.
    history: options.history,
  };
  return testingUtilities;
};

/**
 * Creates a WebGL rendering context using a `<canvas>` element and sets the
 * drawing buffer.
 *
 * @param canvasRef
 * @param drawingBufferHeight
 * @param drawingBufferWidth
 */
export const createReglInstance = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawingBufferHeight: number,
  drawingBufferWidth: number
) => {
  /* When we use a ref, the `current` DOM node could be either the HTML element
   * we specified (a <canvas>) or `null`.
   * React guarantees that refs are set before `componentDidMount` or
   * `componentDidUpdate` hooks, so we can use `!` to tell typescript that we
   * know for sure that `current` is not `null`.
   * https://stackoverflow.com/a/50019873/3036129
   */
  const canvas: HTMLCanvasElement = canvasRef.current!;
  // assign a class to the canvas so we can set width and height in the CSS.
  canvas.setAttribute("class", "regl-canvas");
  /* Set the size of the drawingbuffer (i.e. how many pixels are in the
   * canvas). Note that this has NOTHING to do with the size the canvas is
   * displayed (which is set in the CSS).
   * https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
   */
  canvas.setAttribute("height", `${drawingBufferHeight}`);
  canvas.setAttribute("width", `${drawingBufferWidth}`);
  const regl = REGL(canvas);
  // console.warn(regl._gl);
  return regl;
};
