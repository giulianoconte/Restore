function createObject(radius_, angle_, fileName) {
	var s = createSprite(-666, -666);
	s.addImage(getResource(fileName));

	s.orient = function() {
		s.rotation = (s.ang + (Math.PI / 2)) * (360 / (2 * Math.PI));
		s.position.x = p5.Vector.add(s.offs, s.pos).x;
		s.position.y = p5.Vector.add(s.offs, s.pos).y;
	}
	s.move = function(dir) {
		s.pos.rotate(-s.ang);
		s.ang += dir * s.spe;
		s.pos.rotate(s.ang);

		s.orient();
	}

	s.offs = createVector(HALF_GAME_SIZE, HALF_GAME_SIZE);
	s.mag = radius_;
	s.ang = angle_ * (360 / (2 * Math.PI));
	s.pos = createVector(s.mag, 0.0);
	s.pos.rotate(s.ang);
	s.spe = 0.05;

	s.orient();

	return s;
}
