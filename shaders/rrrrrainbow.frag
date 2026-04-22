#define HIGHP

uniform sampler2D u_noise;      // 噪声纹理
uniform vec2 u_campos;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_texCoords;

// 色相 (0~1) 转 RGB
vec3 hue_to_rgb(float hue) {
    vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return rgb;
}

void main() {
    vec2 c = v_texCoords.xy;
    vec2 coords = vec2(c.x * u_resolution.x + u_campos.x, c.y * u_resolution.y + u_campos.y);

    float btime = u_time / 5000.0;
    float wave = abs(sin(coords.x * 1.1 + coords.y) + 0.1 * sin(2.5 * coords.x) + 0.15 * sin(3.0 * coords.y)) / 30.0;

    float noise = wave + (
        texture2D(u_noise, coords / (100.0 / 2.0) + vec2(btime) * vec2(-0.2, 0.8)).r +
        texture2D(u_noise, coords / (100.0 / 2.0) + vec2(btime * 1.1) * vec2(0.8, -1.0)).r
    ) / 2.0;

    // 将噪声映射到色相（可根据需要调整倍数）
    float hue = fract(noise * 2.0);   // 彩虹重复次数
    vec3 rainbow = hue_to_rgb(hue);

    // 完全不保留原图像，直接输出彩虹色，alpha = 1.0
    gl_FragColor = vec4(rainbow, 1.0);
}