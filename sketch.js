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
var GAME_SIZE = 580; //this is so game can be fully seen on 720p browser windows
var HALF_GAME_SIZE = GAME_SIZE / 2;

var WINNING_ATMOSPHERE_STRENGTH = 1.0;

var PLANET_RADIUS = 120;
var PLAYER_RADIUS = PLANET_RADIUS + 25;
var ACORN_RADIUS = PLANET_RADIUS + 55;
var ENEMY_RADIUS = PLANET_RADIUS + 130;
var ENEMY_RADIUS_OFFSET = 20;
var TREE_RADIUS = PLANET_RADIUS + 45;
var GRASS_RADIUS = PLANET_RADIUS + 1;
var GRASS_RADIUS_OFFSET = 4;

var PLANET_COLLISION_RADIUS = 118;
var PLAYER_COLLISION_RADIUS = 20;
var ACORN_COLLISION_RADIUS = 40;
var TREE_COLLISION_RADIAL = 5;

var SPAWN_RATE = 0.002;
var ENEMY_SPEED = 0.04;
var ENEMY_FORCE = 0.001;
var ENEMY_FRICTION = 0.01;
var ENEMY_SHOOT_TIME = 1000;
var ENEMY_SHOOT_TIME_OFFSET = 500;
var BULLET_SPEED = 2;
var BULLET_LIFE_TIME = 200;
var ACORN_RELOAD_TIME = 1000;
var ACORN_SPEED = 6;

var TARGET_PLAYER = 0.2;
var TARGET_SAPLING = 0.4;
var TARGET_TREE = 0.4;

var KEY_W = false;
var KEY_S = false;
var KEY_A = false;
var KEY_D = false;

var cnv; //canvas

// win condition: get atmosphericStrength >= WINNING_ATMOSPHERE_STRENGTH
var atmosphereStrength = 0.0;
var hasWon = false;
var hasLost = false;

var restore;
var youWin;
var youLose;

var planet;
var atmosphere;
var player;
var acorn;
var enemies = [];
var bullets = [];
var trees = [];
var saplings = [];
var grasses = [];
var deadIDs = [];

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
			bullets[bullets.length-1].setLife(BULLET_LIFE_TIME);
			//need to create partial function to pass id into next function reference
			//http://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli/321527#321527
			var customShoot = partial(repeatShoot, id);
			setTimeout(customShoot, ENEMY_SHOOT_TIME + Math.random()*ENEMY_SHOOT_TIME_OFFSET);
		}
	}
}

function preload() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	surface = createSurface();
	atmosphere = createAtmosphere(80.0);
	planet = new GameObject(0.0, 0.0, "world3.png");
	//init grass
	for (var i = 0; i < 360; i++) {
		var off = Math.random();
		var off2 = Math.floor(Math.random() * GRASS_RADIUS_OFFSET);
		if (off < 0.4) off = 2;
		else if (off < 0.75) off = 5;
		else if (off < 0.95) off = 1;
		else if (off < 0.975) off = 3;
		else if (off < 1.0) off = 4;
		grasses.push(new GameObject(GRASS_RADIUS + (off2), i, "grass" + (off) + ".png"));
		grasses[i].setVisible(false);
	}
	player = new GameObject(PLAYER_RADIUS, 90, "player1.png");
	player.setHP(10);
	acorn = new GameObject(ACORN_RADIUS, player.getAngle(), "acorn1.png");
	restore = new GameObject(0, 90, "RESTORE.png");

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

function isAliveID(id) {
	for (var i = 0; i < deadIDs.length; i++) {
		if (id === deadIDs[i]) {
			return false;
		}
	}
	return true;
}

function killID(id) {
	deadIDs.push(id);
}

function getSomeTargetID() {
	var rand = Math.floor(Math.random()*2);
	if (rand === 0 && trees.length > 0) { //trees
		var choice = Math.floor(Math.random()*trees.length)
		return trees[choice].getID();
	}
	if (rand === 1 && saplings.length > 0) { //saplings
		var choice = Math.floor(Math.random()*saplings.length)
		return saplings[choice].getID();
	}
	return player.getID(); //player
}

function getIDAngle(id) {
	if (id === player.getID()) {
		return player.getAngle();
	}
	for (var i = 0; i < saplings.length; i++) {
		if (id === saplings[i].getID()) {
			return saplings[i].getAngle();
		}
	}
	for (var i = 0; i < trees.length; i++) {
		if (id === trees[i].getID()) {
			return trees[i].getAngle();
		}
	}
	return Math.random()*360;
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

function updatePlayer() {
	if (KEY_A) {
		player.move(1);
	}
	if (KEY_D) {
		player.move(-1);
	}
	player.steer();
}

function reloadAcorn() {
	acorn.setAcornState(1);
	acorn.setVisible(true);
}

function updateAcorn() {
	var state = acorn.getAcornState()
	if (state === 1) {//loaded
		acorn.setAngle(player.getAngle());
		acorn.setMag(ACORN_RADIUS);
		acorn.teleport();
	}
	if (state === 2) {//fired
		acorn.addMag(ACORN_SPEED);
		acorn.teleport();
	}
	if (state === 3) {//recharge
		acorn.setVisible(false);
	}
	if (KEY_W && acorn.getAcornState() !== 2 && acorn.getAcornState() !== 3) {
		acorn.setAcornState(2);
		setTimeout(reloadAcorn, ACORN_RELOAD_TIME);
	}
	if (KEY_S && acorn.getAcornState() !== 2 && acorn.getAcornState() !== 3) {
		acorn.setAcornState(3);
		var type = Math.floor(Math.random()*2);
			if (type === 0) {
				saplings.push(new GameObject(TREE_RADIUS, player.getAngle(), "sapling1.png"));
				saplings[saplings.length-1].setHP(2);
				surface.addSapling(player.getAngle());
			}
			if (type === 1) {
				var off = Math.ceil(Math.random()*2);
				trees.push(new GameObject(TREE_RADIUS, player.getAngle(), "tree" + off + ".png"));
				surface.removeSapling(player.getAngle());
				trees[trees.length-1].setHP(5);
				surface.addTree(player.getAngle());
			}
			setTimeout(reloadAcorn, ACORN_RELOAD_TIME);
	}
	//collision
	for (var i = 0; i < enemies.length; i++) {
		if (circleCollision(acorn.getX(), acorn.getY(),
				enemies[i].getX(), enemies[i].getY(), ACORN_COLLISION_RADIUS)) {
			enemies[i].kill()
			enemies.splice(i, 1);
		}
	}
}

function spawnEnemies() {
	if (Math.random() < trees.length*SPAWN_RATE && !hasWon && !hasLost && enemies.length < 25) {
		var i = enemies.length;
		enemies.push(new GameObject(ENEMY_RADIUS + Math.random()*ENEMY_RADIUS_OFFSET, 45*i, "enemy5.png"));
		enemies[i].setMaxSpeed(ENEMY_SPEED);
		enemies[i].setMaxForce(ENEMY_FORCE);
		enemies[i].setFriction(ENEMY_FRICTION);
		enemies[i].setTargetID(getSomeTargetID());
		enemies[i].setTargetAngle(getIDAngle(enemies[i].getTargetID()));
		repeatShoot(enemies[i].getID());
	}
}

function updateEnemies() {
	if (!hasWon) {
		spawnEnemies();
		if (keyWentDown("q")) {
			for (var i = 0; i < enemies.length; i++) {
				enemies[i].setTargetID(getSomeTargetID());
				enemies[i].setTargetAngle(getIDAngle(enemies[i].getTargetID()));
			}
		}
		for (var i = 0; i < enemies.length; i++) {
			if (!isAliveID(enemies[i].getTargetID())) {
				enemies[i].setTargetID(getSomeTargetID());
				enemies[i].setTargetAngle(getIDAngle(enemies[i].getTargetID()));
			}
			enemies[i].setTargetAngle(getIDAngle(enemies[i].getTargetID()));
			enemies[i].seek();
			enemies[i].steer();
		}
	} else {
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].kill();
			enemies.splice(i, 1);
		}
	}
}

function updateBullets() {
	for (var i = 0; i < bullets.length; i++) {
		var bulletDead = false;
		//move
		bullets[i].addMag(-BULLET_SPEED);
		bullets[i].steer();
		//check collisions
		//player collision
		if (circleCollision(bullets[i].getX(), bullets[i].getY(),
				player.getX(), player.getY(), PLAYER_COLLISION_RADIUS)) {
			player.addHP(-1);
			bullets[i].setLife(0);
			bullets.splice(i, 1);
			bulletDead = true;
		}
		if (bulletDead) continue;
		//sapling collision
		for (var j = 0; j < saplings.length; j++) {
			if (circleCollision(bullets[i].getX(), bullets[i].getY(),
					planet.getX(), planet.getY(), PLANET_COLLISION_RADIUS + 2)) {
				if (Math.abs(bullets[i].getAngle() - saplings[j].getAngle()) < TREE_COLLISION_RADIAL) {
					saplings[j].addHP(-1);
					bullets[i].setLife(0);
					bullets[i].kill();
					bullets.splice(i, 1);
					bulletDead = true;
					if (bulletDead) break;;
				}
			}
		}
		if (bulletDead) continue;
		//sapling collision
		for (var j = 0; j < trees.length; j++) {
			if (circleCollision(bullets[i].getX(), bullets[i].getY(),
					planet.getX(), planet.getY(), PLANET_COLLISION_RADIUS + 2)) {
				if (Math.abs(bullets[i].getAngle() - trees[j].getAngle()) < TREE_COLLISION_RADIAL) {
					trees[j].addHP(-1);
					bullets[i].setLife(0);
					bullets[i].kill();
					bullets.splice(i, 1);
					bulletDead = true;
					if (bulletDead) break;;
				}
			}
		}
		if (bulletDead) continue;
		//planet collision
		if (circleCollision(bullets[i].getX(), bullets[i].getY(),
				planet.getX(), planet.getY(), PLANET_COLLISION_RADIUS)) {
			bullets[i].setLife(0);
			bullets[i].kill();
			bullets.splice(i, 1);
			bulletDead = true;
		}
		if (bulletDead) continue;
	}
}

function updateSaplings() {
	for (var i = 0; i < saplings.length; i++) {
		if (saplings[i].getHP() <= 0) {
			surface.removeSapling(saplings[i].getAngle());
			saplings[i].setLife(0);
			saplings.splice(i, 1);
		}
	}
}

function updateTrees() {
	for (var i = 0; i < trees.length; i++) {
		if (trees[i].getHP() <= 0) {
			surface.removeTree(trees[i].getAngle());
			trees[i].setLife(0);
			trees.splice(i, 1);
		}
	}
}

function update() {
	updatePlayer();
	updateAcorn();
	updateEnemies();
	updateBullets();
	updateSaplings();
	updateTrees();

	if (false) {
		saplings.push(new GameObject(TREE_RADIUS, player.getAngle(), "sapling1.png"));
		saplings[saplings.length-1].setHP(2);
		surface.addSapling(player.getAngle());
	}
	if (false) {
		var off = Math.ceil(Math.random()*2);
		trees.push(new GameObject(TREE_RADIUS, player.getAngle(), "tree" + off + ".png"));
		surface.removeSapling(player.getAngle());
		trees[trees.length-1].setHP(5);
		surface.addTree(player.getAngle());
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
	atmosphereStrength = (surface.coverage()*0.3) + (trees.length*0.05);
	atmosphere.setIntensity(atmosphereStrength);

	if (atmosphereStrength >= WINNING_ATMOSPHERE_STRENGTH && !hasWon) {
		youWin = new GameObject(0, 90, "YOUWIN.png");
		console.log("YOU WIN");
		hasWon = true;
		restore.setVisible(false);
	}
	if (player.getHP() <= 0 && !hasLost) {
		youLose = new GameObject(0, 90, "YOULOSE.png");
		console.log("YOU LOSE");
		hasLost = true;
		acorn.setVisible(false);
		restore.setVisible(false);
	}
}

function draw() {
	getInput();
	update();

	background(25);
  fill(0);
  drawSprites();
}
