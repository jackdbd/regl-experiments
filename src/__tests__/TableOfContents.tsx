import React from "react";
import { withRouter } from "react-router";
import { cleanup } from "react-testing-library";
import TableOfContents from "../components/Home/TableOfContents";
import { renderWithRouter } from "../utils";

// Create a new component that is "connected" to the router.
const TableOfContentsWithRouter = withRouter(props => {
  return (
    <div
      data-testid="toc-container"
      data-pathname={`${props.location.pathname}`}
      data-history-length={`${props.history.length}`}
    >
      <TableOfContents />
    </div>
  );
});

describe("TableOfContents", () => {
  afterEach(cleanup);
  it("renders only 1 child", () => {
    const { getByText } = renderWithRouter(<TableOfContentsWithRouter />);
    expect(getByText("Table of Contents").childNodes).toHaveLength(1);
  });
  it("renders a list of 4 items", () => {
    const { getByTestId } = renderWithRouter(<TableOfContentsWithRouter />);
    expect(getByTestId("list-of-regl-experiments").childNodes).toHaveLength(4);
  });
});
