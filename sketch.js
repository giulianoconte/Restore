// variables: A B
// axiom: A
// rules: (A -> AB), (B -> A)

var cnv; //canvas

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(400, 400);
  centerCanvas();

  background(51);
}

function windowResized() {
	centerCanvas();
}

function draw() {
  background(51, 25, 25);
  fill(0);
  textAlign(CENTER);
  text("Click to create a new sprite", width/2, height/2);
  drawSprites();
}

function mousePressed() {
  var s = createSprite(mouseX, mouseY, 30, 30);
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
}
