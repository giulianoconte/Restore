
function createAtmosphere(spread_) {
  var a = createObject(0.0, 0.0, "");
  a.init = function() {
    a.intensity = 0.0;
    a.spread = spread_;
  }
  a.draw = function() {
    push();
    var c = color(0, 191, 255, 1.0)
    var rings = 90.0;
    var red, green, blue, alpha;
    var distance = map(a.intensity, 0, 1, 0, 3.8);;
    for (var r = rings; r >= 0.0; r--) {
      alpha = map(r, 0, rings, a.intensity, 0);
      red = map(r, 0, rings, 0, 100);
      green = map(r, 0, rings, 50, 150);
      blue = map(r, 0, rings, 255, 255);
      fill(red, green, blue, alpha);
      ellipse(0, 0, 240 + (distance * r), 240 + (distance * r));
    }
    pop();
  }
  a.setIntensity = function(intensity_) {
    a.intensity = intensity_;
  }
  a.init();
  return a;
}
