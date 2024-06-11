let imgs = [];
let imgData = [];
let imgLoaded = false;
let radiusFactor = 0.8;
let invertShader;
let buffer;

let imageDetails = [
  { name: "avocado", x: 420, y: 810, scale: 0.7, angle: 0 },
  { name: "caffe", x: 1320, y: 50, scale: 1, angle: 0 },
  { name: "gambero", x: 1100, y: 840, scale: 1, angle: 0 },
  { name: "patata", x: 1670, y: 600, scale: 0.6, angle: 0 },
  { name: "pomodoro", x: 810, y: 650, scale: 1, angle: 0 },
  { name: "riso", x: 1610, y: 200, scale: 0.8, angle: 0 },
  { name: "salmone", x: 50, y: 50, scale: 1, angle: 0 },
  { name: "soia", x: 800, y: 70, scale: 0.88, angle: 0 },
  { name: "tonno", x: 160, y: 400, scale: 1, angle: 0 },
  { name: "zucchero", x: 550, y: 400, scale: 0.8, angle: 0 },
  { name: "mais", x: 1100, y: 550, scale: 1, angle: -70 }
];

function preload() {
  for (let i = 0; i < imageDetails.length; i++) {
    let imgDetail = imageDetails[i];
    imgs[i] = loadImage(`assets/immagini_inv/${imgDetail.name}.png`, () => {
      if (i === imageDetails.length - 1) imgLoaded = true;
      console.log(`Image ${imgDetail.name} loaded successfully`);
    });
  }
  invertShader = loadShader('/p5/invertEffect.vert', '/p5/invertEffect.frag');
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
  noLoop();
  buffer = createGraphics(1920, 1080, WEBGL);
  buffer.noSmooth(); 
  buffer.noStroke(); 
  buffer.clear(); // buffer with transparent background
  for (let i = 0; i < imageDetails.length; i++) {
    let imgDetail = imageDetails[i];
    imgDetail.img = imgs[i];
  }
}

function draw() {
  if (!imgLoaded) return; 

  background(255);

  for (let i = 0; i < imageDetails.length; i++) {
    let imgDetail = imageDetails[i];
    let x = imgDetail.x;
    let y = imgDetail.y;
    let scaleValue = imgDetail.scale; 
    let angle = imgDetail.angle;
    let img = imgDetail.img;

    // resize buffer to the size of the image
    buffer.resizeCanvas(img.width, img.height);
    buffer.clear();

    // shader
    buffer.shader(invertShader);
    invertShader.setUniform('resolution', [img.width, img.height]);
    invertShader.setUniform('mouse', [mouseX - x + img.width / 2, img.height - (mouseY - y + img.height / 2)]);
    invertShader.setUniform('maxDist', dist(0, 0, width, height) * radiusFactor);
    invertShader.setUniform('tex', img);

    buffer.push();
    buffer.translate(img.width / 2, img.height / 2); 
    buffer.rectMode(CENTER);
    buffer.rect(0, 0, img.width, img.height); // rect to apply the shader
    buffer.pop();

    push();
    translate(x - width / 2, y - height / 2); // WEBGL center
    rotateZ(radians(angle));
    scale(scaleValue, -scaleValue);
    imageMode(CENTER);
    image(buffer, 0, 0);
    pop();
  }
}

function mouseMoved() {
  redraw();
}
