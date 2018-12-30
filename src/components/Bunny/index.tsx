import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import createCamera, { Vec3 } from "regl-camera";
import { makeDrawCommandBunny } from "../../regl-draw-commands/bunny";
import "./index.css";

// `camera` represents the object/function returned by the `createCamera` constructor.
interface IState {
  camera: any;
  drawCommand: any;
}

class Bunny extends React.Component<{}, IState> {
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
    canvas.setAttribute("height", "500");
    canvas.setAttribute("width", "500");
    /* Note: instead of creating a WebGL context for each React component, we
     * could try reusing the same WebGL context for all components.
     * https://github.com/regl-project/multi-regl
     */
    this.regl = REGL(canvas);
    const cameraProps = {
      center: [0, 2.5, 0] as Vec3,
    };
    const camera = createCamera(this.regl, cameraProps);
    const drawCommand = makeDrawCommandBunny(this.regl);
    this.setState({
      camera,
      drawCommand,
    });
  }
  public componentWillUnmount() {
    if (this.regl) {
      this.regl.destroy();
    }
  }
  public render() {
    const clearOptions = {
      color: [1.0, 1.0, 1.0, 1.0] as REGL.Vec4,
      depth: 1.0,
    };
    if (this.state && this.regl) {
      const callback: REGL.FrameCallback = () => {
        /* Pass to the camera function an updateCamera function which takes the
         * props from the regl context (I think) and updates the camera state */
        this.state.camera((props: any) => {
          if (!props.dirty) {
            // nothing to do if we didn't change the camera
            return;
          }
          this.regl!.clear(clearOptions);
          this.state.drawCommand(props);
        });
      };
      this.regl.frame(callback);
    }
    return (
      <div>
        <h1>Bunny</h1>
        <Link to="/">{"Home"}</Link>
        <div
          style={{ border: "1px solid black", height: "600px", width: "800px" }}
        >
          <canvas ref={this.canvasRef} />
        </div>
        <p>TODO: Bunny camera description...</p>
      </div>
    );
  }
}

export default Bunny;
