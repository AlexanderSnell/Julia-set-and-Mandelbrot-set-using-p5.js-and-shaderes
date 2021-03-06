// Declarations
let scaler = 1.5;
// Dimensions
let x = window.innerWidth;
let y = window.innerHeight;
// Shaders
let mandelbrot;
let aJulia;
// Canvas and nav stuff
let center = [0,0];
let scale = [scaler*(x/y),scaler];
let spaceBar = false;
let toggel = false;
let c = [2,0];
let touchScreenUser = null;

// User type check
try {
  window.addEventListener('touchstart', function() {
    if (touchScreenUser == null) {
      let input = confirm("Press ok if you are using a mobile devices otherwise just press cancel.");
      touchScreenUser = input;
    }
  });
}
catch(err) {
  touchScreenUser = false;
}


function preload() {
  mandelbrot = loadShader('shader.vert', 'mandelbrot.frag');
  aJulia = loadShader('shader.vert', 'aJuliaSet.frag');
}

function setup() {
  cnv = createCanvas(x, y, WEBGL);
  cnv.touchMoved(mouseMoved);
  noStroke();
}

function draw() {
  if (toggel == true) {
    mandelbrotSet();
  } else {
    aJuliaSet();
  }
}

// Navigation
function keyTyped() {
  if (key === ' ') {
    spaceBar ^= true;
  }
  if (key === "-") {
    scale[0] /= 0.6;
    scale[1] /= 0.6;
  }
  if (key === "=") {
    scale[0] *= 0.6;
    scale[1] *= 0.6;
  }
  if (key === "h") {
    scale[0] = scaler*(x/y);
    scale[1] = scaler; 
    center[0] = 0;
    center[1] = 0;
  }
  if (key === "t") {
    toggel ^= true;
  }
}

function mouseClicked() {
  if (touchScreenUser == true) return;
  center[0] -= map(mouseX, 0, width, -scale[0], scale[0]);
  center[1] += map(mouseY, 0, height, -scale[1], scale[1]);
  scale[0] *= 0.6;
  scale[1] *= 0.6;
}

function mouseMoved() {
  //if (touchScreenUser == true) return;
  if (spaceBar == false) {
    c[0] = mouseX * scale[0] * 2.0/width - (scale[0] + center[0]);
    c[1] = mouseY * scale[1] * 2.0/height - (scale[1] +  center[1]);
  }
}

// Shader setup
function mandelbrotSet(){
  mandelbrot.setUniform('uResolution', [width, height]);
  mandelbrot.setUniform('uCenter',center);
  mandelbrot.setUniform('uScale',scale);
  mandelbrot.setUniform('uMaxCount',100);
  shader(mandelbrot);
  rect(0,0,width,height);
}

function aJuliaSet(){
  aJulia.setUniform('uResolution', [width, height]);
  aJulia.setUniform('uCenter',center);
  aJulia.setUniform('uScale',scale);
  aJulia.setUniform('uMaxCount',100);
  aJulia.setUniform('uC',c);
  shader(aJulia);
  rect(0,0,width,height);
}
