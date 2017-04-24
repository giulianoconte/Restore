
var ATMOSPHERE_GROWTH = 0.0005;

function createAtmosphere(spread_) {
  var a = createObject(0.0, 0.0, "");
  a.init = function() {
    a.intensity = 0.0;
    a.spread = spread_;
  }
  a.draw = function() {
    push();
    var rings = 90.0;
    var red, green, blue, alpha;
    var distance = map(a.intensity, 0, 1, 0, 3.8);;
    for (var r = rings; r >= 0.0; r--) {
      alpha = map(r, 0, rings, a.intensity, 0);
      red = map(r, 0, rings, 0, 100);
      green = map(r, 0, rings, 120, 200);
      blue = map(r, 0, rings, 255, 255);
      fill(red, green, blue, alpha);
      ellipse(0, 0, 220 + (distance * r), 220 + (distance * r));
    }
    pop();
  }
  a.setIntensity = function(intensity_) {
    if (a.intensity < intensity_ + 0.01) {
      a.intensity += ATMOSPHERE_GROWTH;
    } else if (a.intensity > intensity_ - 0.01) {
      a.intensity -= ATMOSPHERE_GROWTH;
    }
    a.intensity = Math.min(a.intensity, 1.0);
    a.intensity = Math.max(a.intensity, 0.0);
  }
  a.init();
  return a;
}
