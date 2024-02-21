let rocketx = 300;
let rockety = 100;
let x1 = 0;
let x2 = 450;
let y1 = 50;
let y2 = 400;
let velocity = 1;
let acceleration = 0.1;
let speed = 2;
let gameState = "start";

function setup() {
  createCanvas(600, 700);
}

function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "game") {
    gameScreen();
    gameOver();
  } else if (gameState === "over") {
    gameOver();
  }
}

function keyPressed() {
  if (keyCode === 32 && gameState === "start") {
    gameState = "game";
  } else if (keyCode === 32 && gameState === "over") {
    resetGame();
  }
}

function startScreen() {
  background(255, 255, 255);
  textSize(40);
  fill(0, 0, 0);
  textAlign(CENTER);
  text("Press Space To Start The Game", 300, 350);
}

function ground() {
  noStroke();
  fill(0, 0, 0);
  rect(0, 600, 800, 100);
}

function rocket() {
  push();
  stroke(150, 150, 150);
  fill(255, 0, 0);
  ellipse(rocketx, rockety - 70, 20, 15);
  fill(0, 0, 150);
  triangle(
    rocketx - 40,
    rockety + 100,
    rocketx,
    rockety + 30,
    rocketx + 40,
    rockety + 100
  );
  push();
  fill(0, 0, 0);
  triangle(
    rocketx - 20,
    rockety + 90,
    rocketx,
    rockety + 50,
    rocketx + 20,
    rockety + 90
  );
  pop();
  ellipse(rocketx, rockety, 75, 145);
  fill(0, 0, 0);
  ellipse(rocketx, rockety, 40, 85);
  fill(225, 225, 225);
  ellipse(rocketx, rockety - 15, 20, 25);
  fill(150, 150, 150);
  ellipse(rocketx, rockety + 10, 3, 5);
  ellipse(rocketx, rockety + 20, 3.5);
  ellipse(rocketx, rockety + 30, 3.5);

  if (velocity < 0) {
    flames();
  }

  pop();
}

function meteoroid(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(117, 117, 117);
  ellipse(0, 0, 100);
  fill(150, 150, 150);
  ellipse(0, -5, 100, 80);
  push();
  translate(0, 0);
  fill(99, 99, 99);
  rotate(-1.0);
  ellipse(-20, -15, 30, 40);
  pop();
  fill(99, 99, 99);
  ellipse(10, -30, 20);
  ellipse(30, 10, 15);
  ellipse(0, 35, 8);
  fill(117, 117, 117);
  ellipse(-20, -20, 5);
  ellipse(5, 0, 10);
  ellipse(30, -20, 5);
  pop();
}

function flames() {
  noStroke();
  fill(255, 165, 0);
  let flameY = rockety + 100;
  triangle(rocketx - 20, flameY, rocketx, flameY + 40, rocketx + 20, flameY);
  triangle(
    rocketx - 40,
    flameY,
    rocketx - 25,
    flameY + 30,
    rocketx - 10,
    flameY
  );
  triangle(
    rocketx + 5,
    flameY,
    rocketx + 25,
    flameY + 30,
    rocketx + 40,
    flameY
  );
  fill(252, 230, 140);
  triangle(rocketx - 15, flameY, rocketx, flameY + 25, rocketx + 15, flameY);
  triangle(
    rocketx - 35,
    flameY,
    rocketx - 25,
    flameY + 20,
    rocketx - 12,
    flameY
  );
  triangle(
    rocketx + 12,
    flameY,
    rocketx + 25,
    flameY + 20,
    rocketx + 35,
    flameY
  );
}

function gameScreen() {
  clear();
  ground();
  rocket();
  meteoroid(x1, y1);
  meteoroid(x2, y2);
  controls();
  updateRocket();
  updateMeteoroids();
}

function controls() {
  if (keyIsDown(38)) {
    velocity = -5;
  } else if (keyIsDown(40)) {
    velocity = +10;
  }
  if (keyIsDown(37)) {
    rocketx = rocketx - speed;
  } else if (keyIsDown(39)) {
    rocketx = rocketx + speed;
  }
}

function updateRocket() {
  velocity = velocity + acceleration;
  rockety = rockety + velocity;

  // if (rockety > 1000 && keyPressed === 38) {
  //   acceleration = 0.05;
  // } else {
  //   acceleration = 0.1;
  // }

  if (rockety >= 500) {
    rockety = 500;
    velocity = 0;
  } else if (rockety <= 80) {
    rockety = 80;
    velocity *= -1;
  }
  if (rocketx <= 0) {
    rocketx = 0;
    rocketx = rocketx + speed;
  } else if (rocketx >= 600) {
    rocketx = 600;
    rocketx = rocketx - speed;
  }

  if (rockety >= 500) {
    if (velocity > 1) {
      console.log("You Lose!");
    } else if (velocity < 1) {
      console.log("You Win!");
    }
  }
}

function updateMeteoroids() {
  x1 += speed;
  if (x1 <= 0 || x1 >= width) {
    speed *= -1;
  }

  x2 -= speed;
  if (x2 <= 0 || x2 >= width) {
    speed *= 1;
  }
}

function gameOver() {
  if (
    rocketx > x1 - 80 &&
    rocketx < x1 + 80 &&
    rockety > y1 - 100 &&
    rockety < y1 + 100
  ) {
    velocity = 0;
    gameState = "over";

    fill(255, 255, 255);
    text("You Crushed!", 300, 350);
    text("Please Press Enter To Restart", 300, 400);
  }

  if (
    rocketx > x2 - 80 &&
    rocketx < x2 + 80 &&
    rockety > y2 - 100 &&
    rockety < y2 + 100
  ) {
    velocity = 0;
    gameState = "over";

    fill(255, 255, 255);
    text("You Crushed!", 300, 350);
    text("Please Press Enter To Restart", 300, 400);
  }
}

function resetGame() {
  rocketx = 300;
  rockety = 100;
  x1 = 50;
  x2 = 450;
  velocity = 1;
  acceleration = 0.1;
  speed = 2;
  gameState = "start";
}
