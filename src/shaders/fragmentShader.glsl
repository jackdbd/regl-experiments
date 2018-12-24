precision mediump float;

varying vec3 frag_color;  // received from the vertex shader

void main () {
  gl_FragColor = vec4(sqrt(frag_color), 1.0);
 }
