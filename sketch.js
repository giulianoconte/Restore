var BUILD_TYPE = 1; //0 for local, 1 for web
var GAME_SIZE = 580;
var HALF_GAME_SIZE = GAME_SIZE / 2;
var PLANET_RADIUS = 120;

var cnv; //canvas

var KEY_W = false;
var KEY_S = false;
var KEY_A = false;
var KEY_D = false;

var planet;
var player;
var testers = [];

function getResource(fileName) {
	var path = "res/";
	if (BUILD_TYPE == 1) path = "https://giulianoconte.github.io/Restore/" + path;
	return loadImage(path + fileName);
}



function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	planet = createObject(0.0, 0.0, "world3.png");
	player = createObject(PLANET_RADIUS + 25, 0, "player1.png");
	for (var i = 0; i < 0; i++) {
		testers.push(createObject(PLANET_RADIUS + 75, 45*i, "player1.png"));
	}
}

function windowResized() {
	centerCanvas();
}

function draw() {
	gameLoop();

	background(25);
	background(230);
  fill(0);
  drawSprites();
}

function getInput() {
	KEY_W = false; KEY_S = false; KEY_A = false; KEY_D = false;
	if (keyWentDown("w") || keyWentDown("W"))
		KEY_W = true;
	if (keyWentDown("s") || keyWentDown("S"))
		KEY_S = true;
	if (keyDown("a") || keyDown("A"))
		KEY_A = true;
	if (keyDown("d") || keyDown("D"))
		KEY_D = true;
}

function gameLoop() {
	getInput();
	if (KEY_A) {
		player.move(1);
	}
	if (KEY_D) {
		player.move(-1);
	}
	if (keyDown("p")) {
		player.addMag(2);
	}
	if (keyDown("o")) {
		player.addMag(-2);
	}
	player.steer();
}

function mousePressed() {
}
