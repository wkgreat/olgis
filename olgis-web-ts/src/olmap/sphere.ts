import {Coordinate} from "ol/coordinate";
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty';

export * from "ol/sphere"

// const WGS84 = {
//     radius: 6378137.0,
//     flattening: 1 / 298.257223563,
//     eccentricity: 0
// };

/**
 * 角度差值 in degree
 * */
export function angleDiff(angle1:number, angle2:number) {
    const a = angle1 % 360;
    const b = angle2 % 360;
    return Math.abs(b-a) <= 180
        ? b - a
        :(b-a>=0 ? b-a-360 : b-a+360)
}

/**
 * 获得夹角，line(c2,c1) 与 line(c2,c3)的夹角
 * */
export function getRelativeAngle(c1:Coordinate, c2:Coordinate, c3:Coordinate) {
    const a1 = getTrueAzimuth(c2,c1);
    const a2 = getTrueAzimuth(c2,c3);
    return angleDiff(a1,a2);
}

/**
 * 真方位角
 * @param c1 start coordinate
 * @param c2 view coordinate
 * @returns true azimuth (in degree)
 * */
export function getTrueAzimuth(c1:Coordinate, c2:Coordinate) {

    const p1 = new LatLon(c1[1],c1[0]);
    const p2 = new LatLon(c2[1],c2[0]);
    return p1.initialBearingTo(p2);

    // const lat1 = degree2Radian(c1[1]);
    // const lat2 = degree2Radian(c2[1]);
    // const dlon = degree2Radian(angleDiff(c1[0],c2[0]));
    // const e = WGS84.eccentricity;
    // const a1 = 1 + (1-Math.pow(e,2)) * Math.pow(Math.tan(lat1),2);
    // const a2 = 1 + (1-Math.pow(e,2)) * Math.pow(Math.tan(lat2),2);
    // const lambda = (1-Math.pow(e,2)) * Math.tan(lat2) / Math.tan(lat1) +
    //     Math.pow(e,2) * Math.sqrt(a2/a1);
    //
    // let b;
    // if(lat1===0) {
    //     b = Math.sin(dlon) / ((1-Math.pow(e,2)) * Math.tan(lat2));
    // } else {
    //     b = Math.sin(dlon) / ((lambda-Math.cos(dlon)) * Math.sin(lat1));
    // }
    //
    // const alpha = radian2Degree(Math.atan(b));
    // return alpha;

}

/**
 * 沿方位角及距离移动点
 * */
export function moveInBearing(c1:Coordinate, distance:number = 1000, bearing:number=0): Coordinate {
    const p1 = new LatLon(c1[1],c1[0]);
    const p2 = p1.direct(distance, bearing).point;
    return [p2.lon, p2.lat];

}