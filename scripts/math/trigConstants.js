const TWO_PI = 2 * Math.PI;

const basicAnglesTrigRatios = new Map([
    [0, {
        sin: 0,
        cos: 1,
        tan: 0,
        cot: Infinity
    }],

    [(Math.PI / 6), {
        sin: 1 / 2,
        cos: Math.sqrt(3) / 2,
        tan: Math.sqrt(3) / 3,
        cot: Math.sqrt(3)
    }],

    [(Math.PI / 4), {
        sin: Math.sqrt(2) / 2,
        cos: Math.sqrt(2) / 2,
        tan: 1,
        cot: 1
    }],

    [(Math.PI / 3), {
        sin: Math.sqrt(3) / 2,
        cos: 1 /2,
        tan: Math.sqrt(3),
        cot: Math.sqrt(3) / 3
    }],

    [(Math.PI / 2), {
        sin: 1,
        cos: 0,
        tan: Infinity,
        cot: 0
    }],

    [Math.PI, {
        sin: 0,
        cos: -1,
        tan: 0,
        cot: Infinity
    }],

    [(3 * Math.PI / 2), {
        sin: -1,
        cos: 0,
        tan: Infinity,
        cot: 0
    }]
]);

const quadrantSigns = {
    1 : {sinSign: 1, cosSign: 1, tanSign: 1, cotSign: 1},
    2 : {sinSign: 1, cosSign: -1, tanSign: -1, cotSign: -1},
    3 : {sinSign: -1, cosSign: -1, tanSign: 1, cotSign: 1},
    4 : {sinSign: -1, cosSign: 1, tanSign: -1, cotSign:-1}
};

export {
    TWO_PI,
    basicAnglesTrigRatios,
    quadrantSigns
};
