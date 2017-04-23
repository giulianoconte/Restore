//0 means no grass on a bit of surface,
//1 means grass growing,
//2 means grass grown,
//3 means grass dying

function createSurface() {
  var surface = [];
  surface.overlaps = [];
  surface.probs = []; //probability array corresponding to each block
  surface.range = 60
  surface.sapRange = 20
  surface.eventProb = 0.001 //probability that grass will grow or die
  surface.randomIncrease = 0.000001;
  surface.distMult = 300;
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
  surface.addSapling = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.sapRange; i < index+surface.sapRange; i++) {
      var ringIndex = Math.floor(i % 360);
      var dist = map(Math.abs(index - i), 0, surface.range,
                     surface.distMult*surface.eventProb, 0);
      dist = dist*dist;
      ringIndex += 360;
      ringIndex %= 360;
      surface.overlaps[ringIndex] += 1;
      if (surface[ringIndex] === 0 || surface[ringIndex] === 3) {
        surface[ringIndex] = 1;
        surface.probs[ringIndex] += dist;
      }
    }
  }
  surface.removeSapling = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.sapRange; i < index+surface.sapRange; i++) {
      var ringIndex = Math.floor(i % 360);
      ringIndex += 360;
      ringIndex %= 360;
      surface.overlaps[ringIndex] = Math.max(surface.overlaps[ringIndex] - 1, 0);
      if ((surface[ringIndex] === 2 || surface[ringIndex] === 1) && surface.overlaps[ringIndex] === 0) {
        surface[ringIndex] = 3;
      }
    }
  }
  surface.addTree = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.range; i < index+surface.range; i++) {
      var ringIndex = Math.floor(i % 360);
      var dist = map(Math.abs(index - i), 0, surface.range,
                     surface.distMult*surface.eventProb, 0);
      dist = dist*dist;
      ringIndex += 360;
      ringIndex %= 360;
      surface.overlaps[ringIndex] += 1;
      if (surface[ringIndex] === 0 || surface[ringIndex] === 3) {
        surface[ringIndex] = 1;
        surface.probs[ringIndex] += dist;
      }
    }
  }
  surface.removeTree = function(angle) {
    var index = surface.getAngleIndex(angle);
    for (var i = index-surface.range; i < index+surface.range; i++) {
      var ringIndex = Math.floor(i % 360);
      var dist = map(Math.abs(index - i), 0, surface.range,
                     0, surface.distMult*surface.eventProb);
      dist = dist*dist;
      ringIndex += 360;
      ringIndex %= 360;
      surface.overlaps[ringIndex] = Math.max(surface.overlaps[ringIndex] - 1, 0);
      if ((surface[ringIndex] === 2 || surface[ringIndex] === 1) && surface.overlaps[ringIndex] === 0) {
        surface[ringIndex] = 3;
        surface.probs[ringIndex] += dist;
      }
    }
  }
  surface.log = function() {
    for (var i = 0; i < surface.length; i++) {
      if (i % 4 === 0) {
        console.log("index: " + i + ", " + surface[i] + ", " + surface.overlaps[i]);
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
