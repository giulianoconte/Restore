var buildType = 0; //0 for local, 1 for web

function getResource(fileName) {
	var path = "res/";
	if (buildType == 1) path = "https://giulianoconte.github.io/Restore/" + path;
	return loadImage(path + fileName);
}

var cnv; //canvas
var planet;

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(640, 640);
  centerCanvas();

	planet = createSprite(320, 320);
	planet.addImage(getResource("world1.png"));

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
