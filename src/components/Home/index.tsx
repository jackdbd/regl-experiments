import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import reactLogo from "./ReactLogo.svg";
import TableOfContents from "./TableOfContents";
import tsLogo from "./TypeScriptLogo.svg";

const Div = styled.div`
  display: block;
`;

const P = styled.p`
  font-size: 24px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* Vertical center alignment */
  justify-content: space-around;
`;
FlexRow.displayName = "FlexRow";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DivLogo = styled.div`
  width: 20vw;
`;

const ReactLogo = styled.img`
  animation-name: ${spin};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
`;
ReactLogo.displayName = "ReactLogo";

const ReglLogo = styled.img`
  height: 100%;
`;

const TypescriptLogo = styled.img`
  height: 100%;
`;

class Home extends Component {
  public render() {
    return (
      <Div>
        <h1>Regl Experiments</h1>
        <P>{"Collection of experiments with Typescript, React, Regl."}</P>
        <FlexRow>
          <DivLogo>
            <TypescriptLogo src={tsLogo} alt="Typescript Logo" />
          </DivLogo>
          <DivLogo>
            <a href="https://reactjs.org/" target="_blank">
              <ReactLogo src={reactLogo} alt="React Logo" />
            </a>
          </DivLogo>
          <DivLogo>
            <a href="https://github.com/regl-project/regl" target="_blank">
              <ReglLogo
                alt="crown"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f451.png"
              />
            </a>
          </DivLogo>
        </FlexRow>
        <TableOfContents />
      </Div>
    );
  }
}

export default Home;
