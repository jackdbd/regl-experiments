import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import styled from "styled-components";
import {
  DrawCommandTriangle,
  IProps as IDrawProps,
  makeDrawCommandTriangle,
} from "../../regl-draw-commands/triangle";
import { createReglInstance } from "../../utils";
const frag: string = require("../../shaders/fragmentShader.glsl").default;
const vert: string = require("../../shaders/vertexShader.glsl").default;

const Div = styled.div`
  display: block;
`;

/**
 * Props for the React component.
 * These props might be different from the ones for the regl draw command.
 *
 * @interface IProps
 */
interface IProps extends IDrawProps {
  drawingBufferHeight: number;
  drawingBufferWidth: number;
}

interface IState {
  drawCommand: DrawCommandTriangle;
}

class OneShotRendering extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    scale: 1.0,
  };
  private regl: REGL.Regl | null = null;
  private canvasRef = React.createRef<HTMLCanvasElement>();
  public componentDidMount() {
    this.regl = createReglInstance(
      this.canvasRef,
      this.props.drawingBufferHeight,
      this.props.drawingBufferWidth
    );
    const drawCommand = makeDrawCommandTriangle(this.regl, frag, vert);
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
        <div
          style={{ border: "1px solid black", height: "600px", width: "800px" }}
        >
          <canvas ref={this.canvasRef} />
        </div>
        <p>TODO: One shot rendering description...</p>
      </Div>
    );
  }
}

export default OneShotRendering;
