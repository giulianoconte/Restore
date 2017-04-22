// variables: A B
// axiom: A
// rules: (A -> AB), (B -> A)

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

	//var planetImg = loadImage("res/world1.png");
	var planetImg = loadImage("https://github.com/giulianoconte/Restore/blob/master/res/world1.png");
	planet = createSprite(400, 400);
	planet.addImage(planetImg);
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
