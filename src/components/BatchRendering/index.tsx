import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import styled from "styled-components";
import {
  DrawCommandBatchOfTriangles,
  makeDrawCommandBatchOfTriangles,
} from "../../regl-draw-commands/batch";
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
    /* When we use a ref, the `current` DOM node could be either the HTML
     * element we specified (a <canvas>) or `null`.
     * React guarantees that refs are set before `componentDidMount` or
     * `componentDidUpdate` hooks, so we can use `!` to tell typescript that we
     * know for sure that `current` is not `null`.
     * https://stackoverflow.com/a/50019873/3036129
     */
    const canvas: HTMLCanvasElement = this.canvasRef.current!;
    // assign a class to the canvas so we can set width and height in the CSS.
    canvas.setAttribute("class", "regl-canvas");
    /* Set the size of the drawingbuffer (i.e. how many pixels are in the
     * canvas). Note that this has NOTHING to do with the size the canvas is
     * displayed (which is set in the CSS).
     * https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
     */
    canvas.setAttribute("height", `${this.props.drawingBufferHeight}`);
    canvas.setAttribute("width", `${this.props.drawingBufferWidth}`);
    /* Note: instead of creating a WebGL context for each React component, we
     * could try reusing the same WebGL context for all components.
     * https://github.com/regl-project/multi-regl
     */
    this.regl = REGL(canvas);
    // console.warn(this.regl._gl);
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
