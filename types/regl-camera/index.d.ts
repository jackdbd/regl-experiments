import REGL from "regl";

export type Vec3 = [number, number, number];
type Camera = any;

interface CameraProps {
  center?: Vec3;
  distance?: number;
  far?: number;
  flipY?: boolean;
  fovy?: number;
  near?: number;
  noScroll?: boolean;
  phi?: Vec3;
  renderOnDirty?: boolean;
  rotationSpeed?: number;
  theta?: Vec3;
  up?: Vec3;
  zoomSpeed?: number;
}

declare function createCamera(regl: REGL.Regl): Camera;
declare function createCamera(regl: REGL.Regl, props_: CameraProps): Camera;

export default createCamera;
