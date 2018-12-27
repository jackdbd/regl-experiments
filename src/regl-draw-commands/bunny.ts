import normals from "angle-normals";
import bunny from "bunny";
import mat4 from "gl-mat4";
import REGL from "regl";

export type DrawCommand = REGL.DrawCommand<REGL.DefaultContext, {}>;
type MDA = REGL.MaybeDynamicAttributes<any, REGL.DefaultContext, {}>;
type MDU = REGL.MaybeDynamicUniforms<any, REGL.DefaultContext, {}>;

export const makeDrawCommandBunny = (reglInstance: REGL.Regl): DrawCommand => {
  const vert = `
    precision mediump float;
    uniform mat4 model, view, projection;
    attribute vec3 position, normal;
    varying vec3 vnormal;
    
    void main() {
      vnormal = normal;
      gl_Position = projection * view * model * vec4(position, 1.0);
    }
  `;

  const frag = `
    precision mediump float;
    varying vec3 vnormal;

    void main () {
      gl_FragColor = vec4(abs(vnormal), 1.0);
    }
  `;

  // convert the vertices of the mesh into the position attribute
  const attributes: MDA = {
    normal: normals(bunny.cells, bunny.positions) as REGL.Vec3[],
    position: bunny.positions as REGL.Vec3[],
  };

  // convert the faces of the mesh into elements
  const elements = bunny.cells as REGL.Vec3[];

  const uniforms: MDU = {
    model: mat4.identity([]) as REGL.Uniform,
    projection: (context: any, props: any, batchId: number): REGL.Mat4 => {
      const out = [];
      const fovy = Math.PI / 4;
      // const aspect = props.drawingBufferWidth / props.drawingBufferHeight;
      // const aspect = canvas.clientWidth / canvas.clientHeight;
      const aspect = props.viewportWidth / props.viewportHeight;
      const near = 0.01;
      const far = 100;
      return mat4.perspective(out, fovy, aspect, near, far);
    },
    view: (context: any, props: any, batchId: number): REGL.Mat4 => {
      // console.log("VIEW", context, props.eye, batchId);
      const out = [];
      const eye: REGL.Vec3 = props.eye;
      const center: REGL.Vec3 = props.center;
      const up: REGL.Vec3 = props.up;
      return mat4.lookAt(out, eye, center, up);
    },
  };

  const drawConfig = {
    attributes,
    elements,
    frag,
    uniforms,
    vert,
  };
  const reglDrawCommand = reglInstance(drawConfig);
  return reglDrawCommand;
};
