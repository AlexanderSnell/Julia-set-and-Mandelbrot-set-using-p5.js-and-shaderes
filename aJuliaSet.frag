#ifdef GL_ES

precision highp float;

#endif

varying vec2 vCoord;
uniform vec2 uCenter;
uniform vec2 uScale;
uniform vec2 uC;

vec3 calc (vec2 pos) {
    const int maxCount = 200;
    vec2 z = vCoord;
    int sCount = 0;
    
    z.x = vCoord.x * uScale[0] * 2.0 - (uScale[0] + uCenter[0]);
    z.y = vCoord.y * uScale[1] * 2.0 - (uScale[1] + uCenter[1]);
    
    for (int count = 0; count <= maxCount; count ++) {
        sCount = count;
        float temp = z.x;
        z.x = z.x * z.x - z.y * z.y + pos.x;
        z.y = 2.0 * temp * z.y + pos.y;
        if(z.x*z.x + z.y*z.y > 4.0) {
            break;
        }
    }
    if (sCount == maxCount) {
        return vec3(0,0,0);
    }
    float escape = float(sCount)/float(maxCount/5);
    return vec3(escape);
}

vec2 position() {
    vec2 pos = vCoord;
    pos.x = uC[0];
    pos.y = uC[1];
    return vec2(pos);
}

void main() {
    gl_FragColor = vec4(calc(position()), 1.0);
}