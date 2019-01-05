import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { render } from "react-testing-library";

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
