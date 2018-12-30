import angleNormals from "angle-normals";
import bunny, { Vec3 } from "bunny";
import { mat4 } from "gl-matrix";
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
    normal: angleNormals(bunny.cells, bunny.positions),
    position: bunny.positions,
  };

  // convert the faces of the mesh into elements
  const elements = bunny.cells;

  const uniforms: MDU = {
    model: mat4.identity(mat4.create()) as REGL.Uniform,
    projection: (context: any, props: any, batchId: number): mat4 => {
      const out = mat4.create();
      const fovy = Math.PI / 4;
      const aspect = props.viewportWidth / props.viewportHeight;
      const near = 0.01;
      const far = 100;
      return mat4.perspective(out, fovy, aspect, near, far);
    },
    view: (context: any, props: any, batchId: number): mat4 => {
      // console.log("VIEW", context, props.eye, batchId);
      const out = mat4.create();
      const eye: Vec3 = props.eye;
      const center: Vec3 = props.center;
      const up: Vec3 = props.up;
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
