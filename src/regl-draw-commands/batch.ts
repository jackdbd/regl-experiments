import REGL from "regl";

const frag = `
  precision mediump float;
  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;

const vert = `
  precision mediump float;

  uniform float angle;
  uniform vec2 offset;
  attribute vec2 position;

  float x, y, z, w;

  void main() {
    x = cos(angle) * position.x + sin(angle) * position.y + offset.x;
    y = -sin(angle) * position.x + cos(angle) * position.y + offset.y;
    z = 0.0;
    w = 1.0;
    gl_Position = vec4(x, y, z, w);
  }
`;

/**
 * Not sure if it's really necessary to declare interfaces for attributes and
 * uniforms. It seems to me a repetition of what is available in the fragment
 * shader and in the vertex shader. Maybe this is handy when the shaders are not
 * specified in this file, but in their own `.glsl` files.
 */
interface IUniforms {
  angle: REGL.Uniform;
  color: REGL.Uniform;
  offset: REGL.Uniform;
}

interface IAttributes {
  position: REGL.Attribute;
}

/**
 * Props for the regl draw command.
 * These props might be different from the ones for the React component.
 * You need to pass these props when calling the regl draw command.
 *
 * @interface IProps
 */
interface IProps {
  // It's not yet possible to restrict a number to be within a range [0.0, 1.0]
  alpha: number;
  frequency: number;
  offset: REGL.Vec2;
}

// Define some type aliases here to keep tidy the code down below.
export type DrawCommandBatchOfTriangles = REGL.DrawCommand<
  REGL.DefaultContext,
  IProps
>;
type DrawConfigTriangle = REGL.DrawConfig<IUniforms, IAttributes, IProps>;
type MDA = REGL.MaybeDynamicAttributes<any, REGL.DefaultContext, IProps>;
type MDU = REGL.MaybeDynamicUniforms<any, REGL.DefaultContext, IProps>;

/**
 * Create a command to draw a batch of triangles in the regl instance.
 *
 * @export
 * @param reglInstance The regl instance which contains the WebGL context.
 */
export const makeDrawCommandBatchOfTriangles = (
  reglInstance: REGL.Regl
): DrawCommandBatchOfTriangles => {
  // [x,y] positions of the 3 vertices (without the offset)
  const p0: REGL.Vec2 = [0.0, 0.5];
  const p1: REGL.Vec2 = [-0.15, -0.25];
  const p2: REGL.Vec2 = [0.25, -0.35];
  const attributes: MDA = {
    position: [p0, p1, p2] as REGL.Attribute,
  };
  const uniforms: MDU = {
    // TODO: context is a REGL.DefaultContext with some additional fields.
    angle: (ctx: any): number => 0.01 * ctx.tick,
    color: (ctx: any, props: IProps, batchId: number): REGL.Vec4 => {
      // console.warn(`batchId ${batchId}, tick ${ctx.tick}`);
      const r = Math.abs(Math.sin(2 * Math.PI * props.frequency * ctx.time));
      const g = batchId % 2 === 0 ? 0.0 : 1.0;
      const b = 0.0;
      const alpha = props.alpha;
      return [r, g, b, alpha];
    },
    offset: reglInstance.prop<IProps, "offset">("offset"),
  };
  const drawConfig: DrawConfigTriangle = {
    attributes,
    count: 3,
    frag,
    uniforms,
    vert,
  };
  const reglDrawCommand = reglInstance(drawConfig);
  return reglDrawCommand;
};
