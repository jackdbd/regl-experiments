import React, { Component } from "react";
import REGL from "regl";
import { makeDrawTriangle } from "../../triangle";

interface IState {
  drawFunction: any;
}

class Regl extends Component<{}, IState> {
  private myRef = React.createRef<HTMLDivElement>();
  //   private reglContext: any;
  public componentDidMount() {
    // const { Regl, InitializationOptions } = REGL;
    // console.log("props", REGL);
    const node = this.myRef.current!;
    node.setAttribute("id", "regl-container");
    // const container = this.myRef;
    // console.warn("old", require("regl"));
    console.warn("new", REGL);
    console.warn("node", node);
    const regl = REGL(node);
    console.warn("regl", regl);
    // const regl = require("regl")({ container });
    // node.focus();
    // REGL("#regl-container");
    // REGL(node);
    // console.log("this.myRef", regl);
    // makeDrawTriangle(this.myRef.current);
    // create a regl draw command by passing a regl context
    const drawTriangle = makeDrawTriangle(regl);
    this.setState({
      drawFunction: drawTriangle,
    });
  }
  //   const regl = require('regl')({
  //     container,
  // this.myRef = React.createRef();
  public render() {
    console.log("state", this.state);
    if (this.state) {
      this.state.drawFunction({
        rgbColors: [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]],
        scale: 1.0,
      });
    }
    return <div ref={this.myRef} />;
  }
}

export default Regl;
