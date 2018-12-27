import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import styled from "styled-components";
import {
  DrawCommandBatchOfTriangles,
  makeDrawCommandBatchOfTriangles,
} from "../../regl-draw-commands/batch";

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
}

interface IState {
  drawCommand: DrawCommandBatchOfTriangles;
}

class BatchRendering extends React.Component<IProps, IState> {
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
          ref={this.myRef}
          style={{ border: "1px solid black", height: "600px" }}
        />
        <p>TODO: Batch rendering description...</p>
      </Div>
    );
  }
}

export default BatchRendering;
