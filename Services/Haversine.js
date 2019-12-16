const atan2 = Math.atan2
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt
const PI = Math.PI

// (mean) radius of Earth (meters)
const R = 6378137

function squared (x) { return x * x }
function toRad (x) { return x * PI / 180.0 }

export function haversineDistance (a, b) {
  var aLat = a.latitude || a.lat
  var bLat = b.latitude || b.lat
  var aLng = a.longitude || a.lng || a.lon
  var bLng = b.longitude || b.lng || b.lon
  var dLat = toRad(bLat - aLat)
  var dLon = toRad(bLng - aLng)
  var f = squared(sin(dLat / 2.0)) + cos(toRad(aLat)) * cos(toRad(bLat)) * squared(sin(dLon / 2.0))
  var c = 2 * atan2(sqrt(f), sqrt(1 - f))
  return R * c
}

export function updateReadingList(readingList, globalLocation) {
  let updatedArticles = [];

  for (let i = 0; i < readingList.length; i++) {
    const pointA = {
      latitude: readingList[i].latitude,
      longitude: readingList[i].longitude
    };

    const pointB = {
      latitude: globalLocation.latitude,
      longitude: globalLocation.longitude
    };

    const newDistance = haversineDistance(pointA, pointB);
    const roundedDistance = Math.round(newDistance * 10) / 10; 

    const updatedArticle = {
      ...readingList[i],
      distance: roundedDistance
    };

    updatedArticles.push(updatedArticle);
  }

  return updatedArticles;
}