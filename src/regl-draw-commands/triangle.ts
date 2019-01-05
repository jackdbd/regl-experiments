import REGL from "regl";

interface IUniforms {
  scale: REGL.Uniform;
}

interface IAttributes {
  color: REGL.Attribute;
  position: REGL.Attribute;
}

// props for the regl draw command
export interface IProps {
  rgbColors: number[][];
  scale: number;
}

// Define some type aliases here to keep tidy the code down below.
export type DrawCommandTriangle = REGL.DrawCommand<REGL.DefaultContext, IProps>;
type DrawConfigTriangle = REGL.DrawConfig<IUniforms, IAttributes, IProps>;
type MDA = REGL.MaybeDynamicAttributes<any, REGL.DefaultContext, IProps>;
type MDU = REGL.MaybeDynamicUniforms<any, REGL.DefaultContext, IProps>;

/**
 * Create a regl command to draw a triangle in the regl instance provided.
 * A command is a complete representation of the WebGL state required to perform
 * some draw call.
 *
 * @param reglContext The regl instance which will contain the WebGL context.
 */
export const makeDrawCommandTriangle = (
  reglContext: REGL.Regl,
  frag: string,
  vert: string
): DrawCommandTriangle => {
  const attributes: MDA = {
    color: reglContext.prop<IProps, "rgbColors">("rgbColors") as REGL.Attribute,
    position: [[1.0, -0.75], [0.0, 0.0], [-1.0, -1.0]] as REGL.Attribute,
  };
  const uniforms: MDU = {
    // I tried to use REGL.Uniform without success
    scale: reglContext.prop<IProps, "scale">("scale"),
  };
  const drawConfig: DrawConfigTriangle = {
    attributes,
    // tell the GPU how many vertices to draw
    count: 3,
    frag,
    uniforms,
    vert,
  };
  const reglDrawCommand = reglContext(drawConfig);
  return reglDrawCommand;
};
