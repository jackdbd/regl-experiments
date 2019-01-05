import { createMemoryHistory } from "history";
import React from "react";
import { withRouter } from "react-router";
import NoMatch from "../components/NoMatch";
import { renderWithRouter } from "../utils";

// Create a new component that is "connected" to the router.
const NoMatchWithRouter = withRouter(props => {
  return (
    <div data-testid="no-match-container">
      <NoMatch
        history={props.history}
        location={props.location}
        match={props.match}
      />
    </div>
  );
});

describe("NoMatch", () => {
  it("renders a simple message when the route is nonexistent (404)", () => {
    const options = {
      history: createMemoryHistory({
        initialEntries: ["/random"],
      }),
      route: "/random",
    };
    const { getByTestId } = renderWithRouter(<NoMatchWithRouter />, options);
    const message = "No match for /random";
    expect(getByTestId("no-match-message").textContent).toBe(message);
  });
});
