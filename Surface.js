//0 means no grass on a bit of surface,
//1 means grass growing,
//2 means grass grown,
//3 means grass dying

function createSurface() {
  var surface = [];
  surface.probs = []; //probability array corresponding to each block
  surface.init = function() {
    for (var i = 0; i < 360; i++) {
      var spawn = Math.floor(Math.random() * 3);
      surface.push(1);
      surface.probs.push(0.1);
    }
  }
  surface.get = function(index) {
    return surface[index];
  }
  surface.getAngleIndex = function(angle) {
    angle = Math.abs(angle % 360);
    return angle;
  }
  surface.coverage = function() {
    var res = 0.0;
    for (var i = 0; i < surface.length; i++) {
      if (surface[i] === 2) {
        res += 1;
      }
    }
    return res / surface.length;
  }
  surface.update = function() {
    var flag = 0;
    for (var i = 0; i < surface.length; i++) {
      if (surface[i] === 1) {
        surface.probs[i] += 0.00001;
        if (Math.random() < surface.probs[i]) {
          surface[i] = 2;
        }
        flag = 1;
      }
      if (surface[i] === 2) {
        surface.probs[i] = 0.0;
      }
      if (surface[i] === 3) {
        surface.probs[i] += 0.00001;
        if (Math.random() < surface.probs[i]) {
          surface[i] = 0;
        }
        flag = 2;
      }
      if (surface[i] === 0) {
        surface.probs[i] = 0.0;
      }
    }
    if (flag === 0 && surface[0] === 2) {
      for (var i = 0; i < surface.length; i++) {
        surface[i] = 3;
      }
    }
    if (flag === 0 && surface[0] === 0) {
      for (var i = 0; i < surface.length; i++) {
        surface[i] = 1;
      }
    }
  }

  surface.init();
  return surface;
}
