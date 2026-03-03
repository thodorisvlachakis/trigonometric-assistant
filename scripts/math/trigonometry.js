import {TWO_PI, basicAnglesTrigRatios, quadrantSigns} from "./trigConstants.js";

export function calculateTrigFunctions(angle) {
    // "angle" parameter must be given in radians

    // First step is to reduct the input angle to the first quadrant
    let {reductedAngle, initialQuadrant} = reductToTheFirstQuardrant(angle);

    let results = {sin: undefined, cos: undefined, tan: undefined, cot: undefined};    

    // Check if the input angle is one of the special ones
    // First check if the reductedAngle is near enough to one of the basic angles, according to a specified tolerance. If it's
    // true, then approximate the reductedAngle with this basic.
    reductedAngle = snapAngleToBasic(reductedAngle, Array.from(basicAnglesTrigRatios.keys()).slice(0,5));

    if (basicAnglesTrigRatios.has(reductedAngle)) {

        // results = structuredClone(besicTrigRatios.get(reductedAngle)); // Unnecessary deep clone due to basicTrigRatios's format
        results = {...basicAnglesTrigRatios.get(reductedAngle)};      
    
    } else {
        // Else, compute its trigonometric functions
        
        results.sin = Math.sin(reductedAngle);
        results.cos = Math.cos(reductedAngle);
        results.tan = Math.tan(reductedAngle);       
        
        if (results.tan !==  0) {
            
            results.cot = 1 / results.tan
        
        } else {

            results.cot = Infinity;
        }
    }

    // Final Step: Consider the initial quadrant to which the input angle belongs.
    // Remember the rules by which the input angle has been reduced to the first quadrant.  

    results.sin = results.sin === 0 ? 0 : results.sin * quadrantSigns[initialQuadrant].sinSign;
    results.cos = results.cos === 0 ? 0 : results.cos * quadrantSigns[initialQuadrant].cosSign;
    results.tan = results.tan === 0 || results.tan === Infinity ? results.tan : results.tan * quadrantSigns[initialQuadrant].tanSign;
    results.cot = results.cot === 0 || results.cot === Infinity ? results.cot : results.cot * quadrantSigns[initialQuadrant].cotSign;
    
    // if(initialQuadrant === 2) {

    //     results.cos = results.cos === 0 ? 0 : results.cos * (-1);
    //     results.tan = results.tan === 0 || results.tan === Infinity ? results.tan : results.tan * (-1);
    //     results.cot = results.cot === 0 || results.cot === Infinity ? results.cot : results.cot * (-1);

    // } else if (initialQuadrant === 3) {

    //     results.sin = results.sin === 0 ? 0 : results.sin * (-1);
    //     results.cos = results.cos === 0 ? 0 : results.cos * (-1);

    // } else if (initialQuadrant === 4) {
        
    //     results.sin = results.sin === 0 ? 0 : results.sin * (-1);
    //     results.tan = results.tan === 0 || results.tan === Infinity ? results.tan : results.tan * (-1);
    //     results.cot = results.cot === 0 || results.cot === Infinity ? results.cot : results.cot * (-1);
    // }

    return results;
}

function normalize(angle) {
    // This function implements the normalization of an angle to the interval [0, 2*Pi)
    // "angle" parameter must be given in radians
    
    return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
}

function reductToTheFirstQuardrant(angle) {
    // This function implements the reduction to the first quadrant of an angle given as parameter
    // "angle" parameter must be given in radians, but also be normalized to [0, 2*Pi)

    // First step is to normalize input angle to the interval [0, 2*Pi)
    angle = normalize(angle);

    if (angle > Math.PI / 2 && angle <=Math.PI) {
        // 2nd quardant :
        // Mathematical Rule :
        //      θ_new = π − θ_input  (supplementary angle)
        //      sinθ_new =  sinθ_input
        //      cosθ_new = −cosθ_input
        //      tanθ_new = −tanθ_input
        //      cotθ_new = -cotθ_input

        return {reductedAngle: Math.PI - angle, initialQuadrant: 2};

    } else if (angle > Math.PI && angle <= (3 * Math.PI / 2)) {
        // 3rd quardant :
        // Mathematical Rule :
        //      θ_new = π + θ_input  (supplementary angle)
        //      sinθ_new = -sinθ_input
        //      cosθ_new = −cosθ_input
        //      tanθ_new = tanθ_input
        //      cotθ_new = cotθ_input

        return {reductedAngle: angle - Math.PI, initialQuadrant: 3};

    } else if (angle > (3 * Math.PI / 2)) {
        // 4th quardant :
        // Mathematical Rule :
        //      θ_new = 2π - θ_input  (supplementary angle)
        //      sinθ_new = -sinθ_input
        //      cosθ_new = cosθ_input
        //      tanθ_new = -tanθ_input
        //      cotθ_new = -cotθ_input

        return {reductedAngle: TWO_PI - angle, initialQuadrant: 4}

    } else {
        // 1st quardant :
        // Mathematical Rule :
        //      θ_new = θ_input  (supplementary angle)
        //      sinθ_new = sinθ_input
        //      cosθ_new = cosθ_input
        //      tanθ_new = tanθ_input
        //      cotθ_new = cotθ_input
        
        return {reductedAngle: angle, initialQuadrant: 1};
    }
}

function snapAngleToBasic(angle, basicAngles, epsilon=1e-15) {

    for (const checkingAngle of basicAngles) {

        if (Math.abs(angle-checkingAngle) < epsilon) {
            return checkingAngle;
        }
    }

    return angle;
}
