import {angleDiff, getTrueAzimuth} from "./sphere";

describe("sphere.ts", ()=>{

    test("angle diff", () => {

        console.log(angleDiff(180,179));
        console.log(angleDiff(179,180));
        console.log(angleDiff(1,359));
        console.log(angleDiff(359,1));

    });

   test("true azimuth", () => {
       const c1 = [0,0];
       const c2 = [-1,-1];
       const ta = getTrueAzimuth(c1,c2);
       console.log(ta);
   })

});