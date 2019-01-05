import React from "react";
import { Link } from "react-router-dom";
import REGL from "regl";
import createCamera, { Vec3 } from "regl-camera";
import { makeDrawCommandBunny } from "../../regl-draw-commands/bunny";
import { createReglInstance } from "../../utils";
import "./index.css";

interface IProps {
  drawingBufferHeight: number;
  drawingBufferWidth: number;
}

// `camera` represents the object/function returned by the `createCamera` constructor.
interface IState {
  camera: any;
  drawCommand: any;
}

class Bunny extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    drawingBufferHeight: 500,
    drawingBufferWidth: 500,
  };
  private regl: REGL.Regl | null = null;
  private canvasRef = React.createRef<HTMLCanvasElement>();
  public componentDidMount() {
    this.regl = createReglInstance(
      this.canvasRef,
      this.props.drawingBufferHeight,
      this.props.drawingBufferWidth
    );
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
