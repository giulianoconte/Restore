//0 means no grass on a bit of surface,
//1 means grass growing,
//2 means grass grown,
//3 means grass dying

function createSurface() {
  var surface = [];
  surface.overlaps = [];
  surface.probs = []; //probability array corresponding to each block
  surface.randomIncrease = 0.000001;
  surface.range = 60
  surface.eventProb = 0.1 //probability that grass will grow or die
  surface.init = function() {
    for (var i = 0; i < 360; i++) {
      var spawn = Math.floor(Math.random() * 3);
      surface.push(0);
      surface.overlaps.push(0);
      surface.probs.push(surface.eventProb);
    }
  }
  surface.get = function(index) {
    return surface[index];
  }
  surface.getAngleIndex = function(angle) {
    angle %= 360;
    angle += 360;
    angle %= 360;
    return Math.floor(angle);
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
  surface.addTree = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.range; i < index+surface.range; i++) {
      var ringIndex = Math.floor(i % 360);
      var dist = map(Math.abs(index - i), 0, surface.range, 1, 0);
      ringIndex += 360;
      ringIndex %= 360;
      if (Math.random() < dist*dist) {
        surface.overlaps[ringIndex] += 1;
        if (surface[ringIndex] === 0) {
          surface[ringIndex] = 1;
        }
      }
    }
  }
  surface.removeTree = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.range; i < index+surface.range; i++) {
      var ringIndex = Math.floor(i % 360);
      ringIndex += 360;
      ringIndex %= 360;
      surface.overlaps[ringIndex] = Math.max(surface.overlaps[ringIndex] - 1, 0);
      if (surface[ringIndex] === 2 && surface.overlaps[ringIndex] === 0) {
        surface[ringIndex] = 3;
      }
    }
  }
  surface.update = function() {
    var flag = 0;
    for (var i = 0; i < surface.length; i++) {
      if (surface[i] === 1) {
        surface.probs[i] += surface.randomIncrease;
        if (Math.random() < surface.probs[i]) {
          surface[i] = 2;
        }
        flag = 1;
      }
      if (surface[i] === 2) {
        surface.probs[i] = surface.eventProb;
      }
      if (surface[i] === 3) {
        surface.probs[i] += surface.randomIncrease;
        if (Math.random() < surface.probs[i]) {
          surface[i] = 0;
        }
        flag = 2;
      }
      if (surface[i] === 0) {
        surface.probs[i] = surface.eventProb;
      }
    }
    if (flag === 0 && surface[0] === 2) {
      for (var i = 0; i < surface.length; i++) {
        //surface[i] = 3;
      }
    }
    if (flag === 0 && surface[0] === 0) {
      for (var i = 0; i < surface.length; i++) {
        //surface[i] = 1;
      }
    }
  }

  surface.init();
  return surface;
}
