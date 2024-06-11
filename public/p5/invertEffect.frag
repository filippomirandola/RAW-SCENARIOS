#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D tex;
uniform float maxDist;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec4 color = texture2D(tex, uv);
  float d = distance(uv * resolution, mouse);
  float threshold = mix(80.0 / 255.0, 1.0, d / maxDist);

  if (color.r > threshold) {
    color.rgb = vec3(0.0);
  } else {
    color.rgb = vec3(1.0);
  }
  
  // Preserve the alpha channel
  gl_FragColor = vec4(color.rgb, color.a);
}

