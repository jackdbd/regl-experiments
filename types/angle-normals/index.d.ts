// Type definitions for angle-normals 1.0
// Project: https://github.com/mikolalysenko/angle-normals
// Definitions by: Giacomo Debidda <https://github.com/jackdbd>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type Vec3 = [number, number, number];

declare function angleNormals(cells: Vec3[], positions: Vec3[]): Vec3[];
export function hypot(x: number, y: number, z: number): number;
export function weight(s: any, r: any, a: any): number;
export function mulAdd(
  dest: any,
  s: any,
  x: number,
  y: number,
  z: number
): void;

export default angleNormals;
