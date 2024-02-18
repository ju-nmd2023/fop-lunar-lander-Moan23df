let rocketx = 400;
let rockety = 200;
let x1 = 0;
let x2 = 500;
let velocity = 1;
const accelaration = 0.1;
const speed = 5;
let gameState = "start";

function setup() {
  createCanvas(800, 800);
}

function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "game") {
    gameScreen();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameState === "start") {
      gameState = "game";
    }
  }
}

function startScreen() {
  background(255, 255, 255);
  textSize(40);
  fill(0, 0, 0);
  textAlign(CENTER);
  text("Press Space To Start The Game", width / 2, height / 2);
}

function ground() {
  noStroke();
  fill(0, 0, 0);
  rect(0, 700, 800, 100);
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

  if (velocity > 0) {
    flames();
  }
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

function flames() {
  noStroke();
  fill(255, 165, 0);
  let flameY = rockety + 180;
  triangle(rocketx - 30, flameY, rocketx, flameY + 80, rocketx + 40, flameY);
  triangle(rocketx - 60, flameY, rocketx - 30, flameY + 60, rocketx, flameY);
  triangle(
    rocketx + 10,
    flameY,
    rocketx + 40,
    flameY + 60,
    rocketx + 70,
    flameY
  );
  fill(252, 230, 140);
  triangle(rocketx - 20, flameY, rocketx, flameY + 50, rocketx + 30, flameY);
  triangle(
    rocketx - 50,
    flameY,
    rocketx - 30,
    flameY + 40,
    rocketx - 10,
    flameY
  );
  triangle(
    rocketx + 15,
    flameY,
    rocketx + 40,
    flameY + 40,
    rocketx + 60,
    flameY
  );
}

function gameScreen() {
  clear();
  ground();
  rocket();
  meteoroid(x1, 0);
  meteoroid(x2, 300);
  controls();
  updateRocket();
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
  velocity = velocity + accelaration;
  rockety = rockety + velocity;

  if (rockety >= 550) {
    rockety = 550;
    velocity = 0;
  } else if (rockety <= 140) {
    rockety = 140;
    velocity *= -1;
  }
  if (rockety >= 540) {
    if (velocity > 1) {
      console.log("You Lose!");
    } else if (velocity < 1) {
      console.log("You Win!");
    }
  }
}
