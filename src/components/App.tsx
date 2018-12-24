import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logo from "./logo.svg";
import Regl from "./Regl";

const Div = styled.div`
  text-align: center;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation-name: ${spin};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  height: 40vmin;
`;
AppLogo.displayName = "AppLogo";

class App extends Component {
  public render() {
    const rgbColors = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]];
    return (
      <Div>
        <h1>Regl in React</h1>
        <Regl rgbColors={rgbColors} scale={0.5} />
        <AppLogo src={logo} alt="logo" />
        <Regl rgbColors={rgbColors} />
      </Div>
    );
  }
}

export default App;
