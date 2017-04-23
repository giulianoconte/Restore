//0 means no grass on a bit of surface, 1 means grass growing, 2 means grass grown

function createSurface() {
  var surface = [];
  surface.init = function() {
    for (var i = 0; i < 180; i++) {
      surface.push(0);
    }
  }
  surface.getAngleIndex = function(angle) {
    angle = Math.abs(angle % 360);
    return angle / 2;
  }
  surface.isCovered = function(percentage) {
    var coverage = 0.0;
    for (var i = 0; i < surface.length; i++) {
      if (surface[i] === 1) {
        coverage += 1;
      }
    }
    if (coverage / surface.length >= percentage) {
      return true;
    } else {
      return false;
    }
  }
  surface.init();
  return surface;
}
