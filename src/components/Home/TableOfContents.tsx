import React, { Component } from "react";
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

class ToC extends Component {
  public render() {
    return (
      <FlexRow>
        <div>
          <h3>Table of Contents</h3>
          <Ul>
            <Li>
              <Link to="/01">{"One shot rendering"}</Link>
            </Li>
            <Li>
              <Link to="/02">{"TODO: Batch rendering"}</Link>
            </Li>
            <Li>
              <Link to="/03">{"TODO: Camera, geometry ?"}</Link>
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
