var BUILD_TYPE = 1; //0 for local, 1 for web
var GAME_SIZE = 580;
var HALF_GAME_SIZE = GAME_SIZE / 2;
var PLANET_RADIUS = 120;

var cnv; //canvas
var planet;
var player;

function getResource(fileName) {
	var path = "res/";
	if (BUILD_TYPE == 1) path = "https://giulianoconte.github.io/Restore/" + path;
	return loadImage(path + fileName);
}

function createObject(x_, y_, fileName) {
	var s = createSprite(x_, y_);
	s.addImage(getResource(fileName));
	return s;
}



function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	planet = createObject(HALF_GAME_SIZE, HALF_GAME_SIZE, "world3.png");
	planet = createObject(HALF_GAME_SIZE, HALF_GAME_SIZE - 120 - 25, "player1.png");

  background(51);
}

function windowResized() {
	centerCanvas();
}

function draw() {
  background(25, 25, 25);
  fill(0);
  drawSprites();
}

function mousePressed() {
  var s = createSprite(mouseX, mouseY, 30, 30);
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
}
