import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";

const Div = styled.div`
  height: 100vh;
  width: 100vw;
`;

const NoMatch: React.FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const message = `No match for ${props.location.pathname}`;
  return (
    <Div>
      <p>{message}</p>
    </Div>
  );
};

export default NoMatch;
