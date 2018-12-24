import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import logo from "./logo.svg";

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
      <div className="App">
        <Header>
          <img src={logo} className="App-logo" alt="logo" />
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
      </div>
    );
  }
}

export default App;
