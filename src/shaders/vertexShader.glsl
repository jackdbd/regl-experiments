precision mediump float;

uniform float scale;
attribute vec2 position;
attribute vec3 color;
varying vec3 frag_color;  // varying to pass to the fragment shader

float z = 0.0;
float w = 1.0;

void main () {
  frag_color = color;
  gl_Position = vec4(position * scale, z, w);
}