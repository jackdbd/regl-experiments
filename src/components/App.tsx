import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logo from "./logo.svg";

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

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const AppLink = styled.a`
  color: #61dafb;
`;

class App extends Component {
  public render() {
    return (
      <Div>
        <Header>
          <AppLogo src={logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <AppLink
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </AppLink>
        </Header>
      </Div>
    );
  }
}

export default App;
