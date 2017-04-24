//various math utilities

function toDegrees(radians) {
  return radians * (360 / (2 * Math.PI));
}
function toRadians(degrees) {
  return degrees * ((2 * Math.PI) / 360);
}

function circleCollision(p1x, p1y, p2x, p2y, radius) {
  var distSquared = (p2x - p1x)*(p2x - p1x) + (p2y - p1y)*(p2y - p1y);
  if (distSquared <= radius*radius) {
    return true;
  } else {
    return false;
  }
}
