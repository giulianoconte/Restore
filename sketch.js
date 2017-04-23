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
var saplings = [];
var grasses = [];
var testers = [];

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function preload() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	surface = createSurface();
	atmosphere = createAtmosphere(80.0);
	planet = new GameObject(0.0, 0.0, "world3.png");
	for (var i = 0; i < 8; i++) {
		enemies.push(new GameObject(PLANET_RADIUS + 130, 45*i, "enemy5.png"));
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


	colorMode(RGB, 255, 255, 255, 1);
}

function setup() {
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

var atmosphereStrength = 0.0;
var removeTreeProb = 0.0;

function updatePlayer() {
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
	player.steer();
}

function updateEnemies() {
	if (KEY_A) {
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(-1);
		}
	}
	if (KEY_D) {
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(1);
		}
	}
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].steer();
	}
}

function updateSaplings() {
	for (var i = 0; i < saplings.length; i++) {
		if (saplings[i].getHP() <= 0) {
			surface.removeSapling(saplings[i].getAngle());
			saplings[i].setLife(1);
			saplings.splice(i, 1);
		}
	}
}

function updateTrees() {
	for (var i = 0; i < trees.length; i++) {
		if (trees[i].getHP() <= 0) {
			surface.removeTree(trees[i].getAngle());
			trees[i].setLife(1);
			trees.splice(i, 1);
		}
	}
}

function update() {
	updatePlayer();
	updateEnemies();
	updateSaplings();
	updateTrees();

	if (keyWentDown("n")) {
		saplings.push(new GameObject(PLANET_RADIUS + 45, player.getAngle(), "sapling1.png"));
		surface.addSapling(player.getAngle());
	}
	if (keyWentDown("m")) {
		trees.push(new GameObject(PLANET_RADIUS + 45, player.getAngle(), "tree1.png"));
		surface.removeSapling(player.getAngle());
		surface.addTree(player.getAngle());
	}
	if (keyWentDown("v")) {
		for (var i = 0; i < saplings.length; i++) {
			saplings[i].addHP(-1);
		}
	}
	if (keyWentDown("b")) {
		for (var i = 0; i < trees.length; i++) {
			trees[i].addHP(-1);
		}
	}
	if (keyWentDown("l")) {
		surface.log();
	}

	//update surface
	surface.update();
	//update grass visibility
	for (var i = 0; i < grasses.length; i++) {
		if (surface.get(i) === 2) {
			grasses[i].setVisible(true);
		} else if (surface.get(i) === 0) {
			grasses[i].setVisible(false);
		}
	}
	//atmosphere grows and shrinks with grass coverage
	atmosphereStrength = surface.coverage();
	atmosphere.setIntensity(atmosphereStrength);

}

function draw() {
	getInput();
	update();

	background(25);
  fill(0);
  drawSprites();
}
