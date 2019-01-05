import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Vertical center alignment */
  justify-content: center; /* Horizontal center alignment */
`;
FlexRow.displayName = "FlexRow";

const Ul = styled.ul`
  color: blue;
`;

const Li = styled.li`
  text-align: left;
`;

class ToC extends React.Component {
  public render() {
    return (
      <FlexRow>
        <div>
          <h3>Table of Contents</h3>
          <Ul data-testid="list-of-regl-experiments">
            <Li>
              <Link to="/01">{"One shot rendering"}</Link>
            </Li>
            <Li>
              <Link to="/02">{"Batch rendering"}</Link>
            </Li>
            <Li>
              <Link to="/03">{"Bunny & Camera"}</Link>
            </Li>
            <Li>
              <Link to="/04">{"TODO: react-regl"}</Link>
            </Li>
          </Ul>
        </div>
      </FlexRow>
    );
  }
}

export default ToC;
