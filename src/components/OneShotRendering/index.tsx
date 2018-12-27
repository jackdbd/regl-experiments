import React, { Component } from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import styled from "styled-components";
import {
  DrawCommandTriangle,
  IProps,
  makeDrawCommandTriangle,
} from "../../regl-draw-commands/triangle";

const Div = styled.div`
  display: block;
`;

interface IState {
  drawCommand: DrawCommandTriangle;
}

class OneShotRendering extends Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    scale: 1.0,
  };
  private regl: REGL.Regl | null = null;
  private myRef = React.createRef<HTMLDivElement>();
  public componentDidMount() {
    /* When we use a ref, the `current` DOM node could be either the HTML
     * element we specified (a <div>) or `null`.
     * React guarantees that refs are set before componentDidMount or
     * componentDidUpdate hooks, so we can use `!` to tell typescript that we
     * know that `current` is not `null`.
     * https://stackoverflow.com/a/50019873/3036129
     */
    const div = this.myRef.current!;
    div.setAttribute("class", "canvas-container");
    /* Note: instead of creating a WebGL context for each React component, we
     * could try reusing the same WebGL context for all components.
     * https://github.com/regl-project/multi-regl
     */
    this.regl = REGL(div);
    // console.warn(regl._gl);
    const drawCommand = makeDrawCommandTriangle(this.regl);
    this.setState({
      drawCommand,
    });
  }
  public componentWillUnmount() {
    if (this.regl) {
      this.regl.destroy();
    }
  }
  public render() {
    const { rgbColors, scale } = this.props;
    if (this.state) {
      this.state.drawCommand({
        rgbColors,
        scale,
      });
    }
    return (
      <Div>
        <h1>One shot rendering</h1>
        <Link to="/">{"Home"}</Link>
        <div ref={this.myRef} style={{ border: "1px solid black" }} />
        <p>TODO: One shot rendering description...</p>
      </Div>
    );
  }
}

export default OneShotRendering;
