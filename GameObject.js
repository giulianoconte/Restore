function createObject(radius_, angle_, fileName) {
	var s = createSprite(-666, -666);
	s.addImage(getResource(fileName));

	s.toDegrees = function(radians) {
		return radians * (360 / (2 * Math.PI));
	}
	s.toRadians = function(degrees) {
		return degrees * ((2 * Math.PI) / 360);
	}
	//init
	s.init = function() {
		s.offs = createVector(HALF_GAME_SIZE, HALF_GAME_SIZE);
		s.mag = radius_;
		s.ang = s.toRadians(angle_);
		s.pos = createVector(s.mag, 0.0);
		s.pos.rotate(-s.ang);
		s.vel = 0.0;
		s.acc = 0.0;
		s.maxSpeed = 0.07;
		s.maxForce = 0.02;
	}
	//set drawing variables to so this can properly be drawn
	s.orient = function() {
		s.rotation = s.toDegrees(-(s.ang - (Math.PI / 2)));
		s.position.x = p5.Vector.add(s.offs, s.pos).x;
		s.position.y = p5.Vector.add(s.offs, s.pos).y;
	}
	s.addMag = function(added) {
		s.mag += added;
		s.move(0);
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
		s.vel -= (0.2 * s.vel); //friction
		s.pos.rotate(-s.ang);
		s.pos.setMag(s.mag);
		s.orient();
	}

	s.init();
	s.orient();

	return s;
}
