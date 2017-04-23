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

var PLAYER_RADIUS = PLANET_RADIUS + 25;
var ENEMY_RADIUS = PLANET_RADIUS + 130;
var GRASS_RADIUS = PLANET_RADIUS + 1;
var ENEMY_SPEED = 0.04;
var ENEMY_FORCE = 0.001;
var ENEMY_FRICTION = 0.01;
var ENEMY_SHOOT_TIME = 1000;
var ENEMY_SHOOT_TIME_OFF = 500;
var BULLET_SPEED = 2;

var cnv; //canvas

var KEY_W = false;
var KEY_S = false;
var KEY_A = false;
var KEY_D = false;

var planet;
var atmosphere;
var player;
var enemies = [];
var bullets = [];
var trees = [];
var saplings = [];
var grasses = [];
var testers = [];

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}
//this funciton was used from:
//http://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli/321527#321527
function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}
//repeatedly shoot from given enemy's id, stops if they are removed from the game
function repeatShoot(id) {
	for (var i = 0; i < enemies.length; i++) {
		//if enemy with their id is still in the game, keep shooting
		if (enemies[i].getID() === id) {
			var angle = enemies[i].getAngle();
			bullets.push(new GameObject(enemies[i].getMag(), enemies[i].getAngle(), "bullet1.png"));
			bullets[bullets.length-1].setLife(100);
			//need to create partial function to pass id into next function reference
			//http://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli/321527#321527
			var customShoot = partial(repeatShoot, id);
			setTimeout(customShoot, ENEMY_SHOOT_TIME + Math.random()*ENEMY_SHOOT_TIME_OFF);
		}
	}
}

function preload() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	surface = createSurface();
	atmosphere = createAtmosphere(80.0);
	planet = new GameObject(0.0, 0.0, "world3.png");
	for (var i = 0; i < 3; i++) {
		enemies.push(new GameObject(ENEMY_RADIUS, 45*i, "enemy5.png"));
		enemies[i].setMaxSpeed(ENEMY_SPEED);
		enemies[i].setMaxForce(ENEMY_FORCE);
		enemies[i].setFriction(ENEMY_FRICTION);
		repeatShoot(enemies[i].getID());
	}
	for (var i = 0; i < 360; i++) {
		var off = Math.random();
		var off2 = Math.floor(Math.random() * 4);
		if (off < 0.4) off = 2;
		else if (off < 0.75) off = 5;
		else if (off < 0.95) off = 1;
		else if (off < 0.975) off = 3;
		else if (off < 1.0) off = 4;
		grasses.push(new GameObject(GRASS_RADIUS + (off2), i, "grass" + (off) + ".png"));
		grasses[i].setVisible(false);
	}
	player = new GameObject(PLAYER_RADIUS, 90, "player1.png");

	colorMode(RGB, 255, 255, 255, 1);
}

function setup() {
}

function windowResized() {
	centerCanvas();
}
var idIter = 0;
function getNextID() {
	return idIter++;
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

function updatePlayer() {
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

function updateEnemies() {
	if (KEY_A) {
		for (var i = 0; i < enemies.length; i++) {
			//enemies[i].move(-1);
		}
	}
	if (KEY_D) {
		for (var i = 0; i < enemies.length; i++) {
			//enemies[i].move(1);
		}
	}
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].setTargetAngle(player.getAngle());
		enemies[i].seek();
		enemies[i].steer();
	}
}

function updateBullets() {
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].addMag(-BULLET_SPEED);
		bullets[i].steer();
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
	updateBullets();
	updateSaplings();
	updateTrees();

	if (keyWentDown("n")) {
		saplings.push(new GameObject(PLANET_RADIUS + 45, player.getAngle(), "sapling1.png"));
		saplings[saplings.length-1].setHP(2);
		surface.addSapling(player.getAngle());
	}
	if (keyWentDown("m")) {
		trees.push(new GameObject(PLANET_RADIUS + 45, player.getAngle(), "tree1.png"));
		surface.removeSapling(player.getAngle());
		trees[trees.length-1].setHP(5);
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
