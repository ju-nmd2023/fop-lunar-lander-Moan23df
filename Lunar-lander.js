let rocketx = 400;
let rockety = 200;
let x1 = 0;
let x2 = 500;
let velocity = 1;
const accelaration = 0.1;
const speed = 5;

function setup() {
  createCanvas(800, 800);
}

function rocket() {
  stroke(150, 150, 150);
  fill(255, 0, 0);
  ellipse(rocketx, rockety - 120, 40, 30);
  fill(0, 0, 150);
  triangle(
    rocketx - 60,
    rockety + 180,
    rocketx,
    rockety + 40,
    rocketx + 70,
    rockety + 180
  );
  push();
  fill(0, 0, 0);
  triangle(
    rocketx - 30,
    rockety + 160,
    rocketx,
    rockety + 100,
    rocketx + 38,
    rockety + 160
  );
  pop();
  ellipse(rocketx, rockety, 150, 250);
  fill(0, 0, 0);
  ellipse(rocketx, rockety, 80, 170);
  fill(225, 225, 225);
  ellipse(rocketx, rockety - 30, 40, 50);
  fill(150, 150, 150);
  ellipse(rocketx, rockety + 20, 7);
  ellipse(rocketx, rockety + 40, 7);
  ellipse(rocketx, rockety + 60, 7);
}

function ground() {
  noStroke();
  fill(0, 0, 0);
  rect(0, 700, 800, 100);
}

function meteoroid(x, y) {
  translate(x, y);
  noStroke();
  fill(117, 117, 117);
  ellipse(150, 200, 200, 200);
  fill(150, 150, 150);
  ellipse(150, 190, 200, 180);
  push();
  translate(150, 150);
  fill(99, 99, 99);
  rotate(-1.1);
  ellipse(-80, -5, 60, 80);
  pop();
  fill(99, 99, 99);
  ellipse(160, 150, 40, 40);
  ellipse(210, 220, 30, 30);
  ellipse(170, 275, 15, 15);
  fill(117, 117, 117);
  ellipse(100, 160, 10, 10);
  ellipse(160, 200, 15, 15);
  ellipse(210, 160, 15);
}

function draw() {
  rocket();
  ground();
  meteoroid(x1, 0);
  meteoroid(x2, 300);
}

function controls() {
  if (keyIsDown(38)) {
    velocity = -5;
  } else if (keyIsDown(40)) {
    velocity = +5;
  }
  if (keyIsDown(37)) {
    rocketx = rocketx - speed;
  } else if (keyIsDown(39)) {
    rocketx = rocketx + speed;
  }
}

function updateRocket() {
  rockety = rockety + velocity;
  velocity = velocity + accelaration;

  if (rockety >= 550) {
    rockety = 550;
    velocity = 0;
  } else if (rockety <= 140) {
    rockety = 140;
    velocity *= -1;
  }
}
