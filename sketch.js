/**
 * Restore
 * author: Giuliano Conte
 *
 * A game about restoring a planet back to health.
 * Made for Ludum Dare 38 (4/21/2017 9PM EST - 4/23/2017 9PM EST)
 * with theme "A Small World".
 *
 * Hosted on <https://giulianoconte.github.io/Restore/>.
 */

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
var atmosphere;
var player;
var enemies = [];
var trees = [];
var grasses = [];
var testers = [];

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	surface = createSurface();
	atmosphere = createAtmosphere(80.0);
	planet = new GameObject(0.0, 0.0, "world3.png");
	for (var i = 0; i < 8; i++) {
		enemies.push(new GameObject(PLANET_RADIUS + 130, 45*i, "enemy5.png"));
	}
	for (var i = 0; i < 0; i++) {
		trees.push(new GameObject(PLANET_RADIUS + 45, i*12, "tree1.png"));
	}
	for (var i = 0; i < 360; i++) {
		var off = Math.random();
		var off2 = Math.floor(Math.random() * 4);
		if (off < 0.4) off = 2;
		else if (off < 0.75) off = 5;
		else if (off < 0.95) off = 1;
		else if (off < 0.975) off = 3;
		else if (off < 1.0) off = 4;
		grasses.push(new GameObject(PLANET_RADIUS + 1 + (off2), i, "grass" + (off) + ".png"));
		grasses[i].setVisible(false);
	}
	player = new GameObject(PLANET_RADIUS + 25, 90, "player1.png");

	// surface.addTree(0);
	// surface.addTree(90);
	// surface.addTree(180);
	// surface.addTree(270);

	colorMode(RGB, 255, 255, 255, 1);
}

function windowResized() {
	centerCanvas();
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

var intense = 0.0;
var removeTreeProb = 0.0;

function update() {
	if (KEY_A) {
		player.move(1);
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(-1);
		}
	}
	if (KEY_D) {
		player.move(-1);
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(1);
		}
	}
	if (keyDown("p")) {
		player.addMag(2);
	}
	if (keyDown("o")) {
		player.addMag(-2);
	}
	if (keyDown("j")) {
		intense += 0.01;
	}
	if (keyDown("k")) {
		intense -= 0.01;
	}
	if (keyWentDown("n")) {
		trees.push(new GameObject(PLANET_RADIUS + 45, player.getAngle(), "tree1.png"));
		surface.addTree(player.getAngle());
	}
	if (keyWentDown("m")) {
		surface.removeTree(player.getAngle());
	}

	//update grasses
	surface.update();
	for (var i = 0; i < grasses.length; i++) {
		if (surface.get(i) === 2) {
			grasses[i].setVisible(true);
		} else if (surface.get(i) === 0) {
			grasses[i].setVisible(false);
		}
	}
	intense = surface.coverage();
	atmosphere.setIntensity(intense);

	player.steer();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].steer();
	}
}

function draw() {
	getInput();
	update();

	background(25);
  fill(0);
  drawSprites();
}
