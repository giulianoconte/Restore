
function getResource(fileName) {
	var path = "res/";
	if (BUILD_TYPE == 1) path = "https://giulianoconte.github.io/Restore/" + path;
	return loadImage(path + fileName);
}

function GameObject(radius_, angle_, fileName) {
	this.s = createSprite(-666, -666);
	if (fileName.length > 3) { //for atmosphere which has no texture
		this.s.addImage(getResource(fileName));
	}

	//init
	this.init = function() {
		this.offs = createVector(HALF_GAME_SIZE, HALF_GAME_SIZE);
		this.mag = radius_;
		this.ang = toRadians(angle_);
		this.pos = createVector(this.mag, 0.0);
		this.pos.rotate(-this.ang);
		this.vel = 0.0;
		this.acc = 0.0;
		this.maxSpeed = 0.07;
		this.maxForce = 0.02;
		this.friction = 0.2;
		this.hp = 2;
	}
	this.getAngle = function() {
		return this.ang * 360 / (Math.PI * 2);
	}
	this.getHP = function() {
		return this.hp;
	}
	this.addHP = function(hp_) {
		this.hp += hp_;
	}
	this.setVisible = function(vis) {
		this.s.visible = vis;
	}
	this.setLife = function(life_) {
		this.s.life = life_;
	}
	//set drawing variables so this can be properly drawn
	this.orient = function() {
		this.s.rotation = toDegrees(-(this.ang - (Math.PI / 2)));
		this.s.position.x = p5.Vector.add(this.offs, this.pos).x;
		this.s.position.y = p5.Vector.add(this.offs, this.pos).y;
	}
	this.addMag = function(m) {
		this.mag += m;
	}
	this.move = function(dir) {
		this.acc = dir * this.maxForce;
		this.vel += this.acc;
		this.vel = Math.max(this.vel, -this.maxSpeed);
		this.vel = Math.min(this.vel, this.maxSpeed);
	}
	this.steer = function() {
		this.pos.rotate(this.ang);
		this.ang += this.vel;
		this.vel -= (this.friction * this.vel); //friction
		this.pos.rotate(-this.ang);
		this.pos.setMag(this.mag);
		this.orient();
	}

	this.init();
	this.orient();
}

function createObject(radius_, angle_, fileName) {
	var s = createSprite(-666, -666);
	if (fileName.length > 3) { //for atmosphere which has no texture
		s.addImage(getResource(fileName));
	}

	//init
	s.init = function() {
		s.offs = createVector(HALF_GAME_SIZE, HALF_GAME_SIZE);
		s.mag = radius_;
		s.ang = toRadians(angle_);
		s.pos = createVector(s.mag, 0.0);
		s.pos.rotate(-s.ang);
		s.vel = 0.0;
		s.acc = 0.0;
		s.maxSpeed = 0.07;
		s.maxForce = 0.02;
		s.friction = 0.2;
	}
	//set drawing variables so this can be properly drawn
	s.orient = function() {
		s.rotation = toDegrees(-(s.ang - (Math.PI / 2)));
		s.position.x = p5.Vector.add(s.offs, s.pos).x;
		s.position.y = p5.Vector.add(s.offs, s.pos).y;
	}
	s.addMag = function(m) {
		s.mag += m;
		console.log("mag: " + aa);
	}
	s.move = function(dir) {
		s.acc = dir * s.maxForce;
		s.vel += s.acc;
		s.vel = Math.max(s.vel, -s.maxSpeed);
		s.vel = Math.min(s.vel, s.maxSpeed);
	}
	s.steer = function() {
		s.pos.rotate(s.ang);
		s.ang += s.vel;
		s.vel -= (s.friction * s.vel); //friction
		s.pos.rotate(-s.ang);
		s.pos.setMag(s.mag);
		s.orient();
	}

	s.init();
	s.orient();

	return s;
}
