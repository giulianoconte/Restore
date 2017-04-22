
function getResource(fileName) {
	var path = "res/";
	if (BUILD_TYPE == 1) path = "https://giulianoconte.github.io/Restore/" + path;
	return loadImage(path + fileName);
}

function createObject(radius_, angle_, fileName) {
	var s = createSprite(-666, -666);
	s.addImage(getResource(fileName));

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
