const M_PI = Math.PI;
const A = 6378245.0;
const EE = 0.00669342162296594323;
const X_PI = M_PI * 3000.0 / 180.0;

function outOfChina(lng, lat) {
  if (lng < 72.004 || lng > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
}

function transformLat(x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * M_PI) + 20.0 * Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * M_PI) + 40.0 * Math.sin(y / 3.0 * M_PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * M_PI) + 320 * Math.sin(y * M_PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLon(x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * M_PI) + 20.0 * Math.sin(2.0 * x * M_PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * M_PI) + 40.0 * Math.sin(x / 3.0 * M_PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * M_PI) + 300.0 * Math.sin(x / 30.0 * M_PI)) * 2.0 / 3.0;
  return ret;
}

function delta(lng, lat) {
  var dLat = transformLat(lng - 105.0, lat - 35.0);
  var dLon = transformLon(lng - 105.0, lat - 35.0);
  var radLat = lat / 180.0 * M_PI;
  var magic = Math.sin(radLat);
  magic = 1 - EE * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((A * (1 - EE)) / (magic * sqrtMagic) * M_PI);
  dLon = (dLon * 180.0) / (A / sqrtMagic * Math.cos(radLat) * M_PI);

  var delta = { x: dLon, y: dLat };
  return delta;
}

function transform(poi) {
  var poiDelta = delta(poi.x, poi.y);
  var pLat = poi.y + poiDelta.y;
  var pLng = poi.x + poiDelta.x;
  var retPoi = { x: pLng, y: pLat };
  return retPoi;
}

function wgs2gcj(poi) {
  if (outOfChina(poi.x, poi.y)) {
    return poi;
  }
  var poiDelta = delta(poi.x, poi.y);
  var pLat = poi.y + poiDelta.y;
  var pLng = poi.x + poiDelta.x;
  var retPoi = { x: pLng, y: pLat };
  return retPoi;
}

function gcj2wgs(poi) {
  if (outOfChina(poi.x, poi.y)) {
    return poi;
  }
  var poiTransform = transform(poi);
  var pLat = poi.y * 2 - poiTransform.y;
  var pLng = poi.x * 2 - poiTransform.x;
  var retPoi = { x: pLng, y: pLat };
  return retPoi;
}

function bd2gcj(poi) {
  var x = poi.x - 0.0065;
  var y = poi.y - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  var pLng = z * Math.cos(theta);
  var pLat = z * Math.sin(theta);
  var retPoi = { x: pLng, y: pLat };
  return retPoi;
}

function gcj2bd(poi) {
  var x = poi.x;
  var y = poi.y;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var pLng = z * Math.cos(theta) + 0.0065;
  var pLat = z * Math.sin(theta) + 0.006;
  var retPoi = { x: pLng, y: pLat };
  return retPoi;
}

function wgs2bd(poi) {
  var poi2 = wgs2gcj(poi);
  var poi3 = gcj2bd(poi2);
  return poi3;
}

function bd2wgs(poi) {
  var poi2 = bd2gcj(poi);
  var poi3 = gcj2wgs(poi2);
  return poi3;
}

module.exports = {
  wgs2bd: wgs2bd,
  gcj2bd: gcj2bd,
}
