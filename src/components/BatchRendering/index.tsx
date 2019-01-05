import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import styled from "styled-components";
import {
  DrawCommandBatchOfTriangles,
  makeDrawCommandBatchOfTriangles,
} from "../../regl-draw-commands/batch";
import { createReglInstance } from "../../utils";
import "./index.css";

const Div = styled.div`
  display: block;
`;

/**
 * Props for the React component.
 * These props might be different from the ones for the regl draw command.
 *
 * @interface IProps
 */
interface IProps {
  alpha: number;
  drawingBufferHeight: number;
  drawingBufferWidth: number;
}

interface IState {
  drawCommand: DrawCommandBatchOfTriangles;
}

class BatchRendering extends React.Component<IProps, IState> {
  private regl: REGL.Regl | null = null;
  private canvasRef = React.createRef<HTMLCanvasElement>();
  public componentDidMount() {
    this.regl = createReglInstance(
      this.canvasRef,
      this.props.drawingBufferHeight,
      this.props.drawingBufferWidth
    );
    const drawCommand = makeDrawCommandBatchOfTriangles(this.regl);
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
    const { alpha } = this.props;
    const clearOptions = {
      color: [0.0, 0.0, 0.0, 1.0] as REGL.Vec4, // r, g, b, a
      depth: 1.0,
    };
    if (this.state && this.regl) {
      const callback: REGL.FrameCallback = () => {
        this.regl!.clear(clearOptions);
        this.state.drawCommand([
          { alpha, frequency: 0.1, offset: [0.0, 0.0] },
          { alpha, frequency: 0.2, offset: [-0.5, 0.0] },
          { alpha, frequency: 0.5, offset: [0.35, -0.35] },
        ]);
      };
      this.regl.frame(callback);
    }
    return (
      <Div>
        <h1>Batch rendering</h1>
        <Link to="/">{"Home"}</Link>
        <div
          style={{ border: "1px solid black", height: "600px", width: "800px" }}
        >
          <canvas ref={this.canvasRef} />
        </div>
        <p>TODO: Batch rendering description...</p>
      </Div>
    );
  }
}

export default BatchRendering;
