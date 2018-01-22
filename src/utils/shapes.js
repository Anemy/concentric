import {
  createColorString,
  createRandomColors,
  createRandomColor
} from './color';

import {
  createRandomSeed,
  floorRandom,
  floorRandomNegate
} from './index';

import { buildSteps } from './steps';

export const generateRandomShapeConfig = (width, height) => {
  const maxPoints = 1000;
  const points = 3 + floorRandom(floorRandom(3) === 1 ? maxPoints : 9); // 1 / 5 chance for possibly many points.
  const amountOfSteps = 2 + (100 - Math.floor(Math.pow(100, Math.random())));

  const maxColorRandom = {
    r: floorRandom(12) === 1 ? 0 : 255,
    g: floorRandom(12) === 1 ? 0 : 255,
    b: floorRandom(12) === 1 ? 0 : 255,
    a: 1
  };

  const randomColorOptions = {
    maxColorRandom,
    blackAndWhite: floorRandom(20) === 1
  };

  // 1/10 random colors, else nice gradient.
  const amountOfColors = floorRandom(10) === 1 ? amountOfSteps : 1 + floorRandom(5);

  const stepCenterMaxDeviationX = floorRandom(4) === 1 ? 0 : 30;
  const stepCenterMaxDeviationY = floorRandom(4) === 1 ? 0 : 30;

  // 1 / 2 chance for no deviation.
  const maxPointDeviation = floorRandom(3) === 1 ? 0 : Math.max(60 - (points / 30), 0);

  const blackBasedShadow = floorRandom(2) === 1;
  const shadowColor = blackBasedShadow ? `rgba(${0}, ${0}, ${0}, ${1})` : createColorString(createRandomColor());

  // console.log('colors', createRandomColors(1 + floorRandom(steps), maxColorRandom));
  // Open street map for data.

  return {
    amountOfSteps,
    centerX: width / 2,
    centerY: height / 2,
    colors: createRandomColors(amountOfColors, randomColorOptions),
    innerRadius: floorRandom(window.innerHeight / 8),
    pointDeviationMaxX: floorRandom(maxPointDeviation),
    pointDeviationMaxY: floorRandom(maxPointDeviation),
    points,
    previousPointDeviationInfluence: floorRandom(3) === 1, // 1 out of 3
    randomSeed: createRandomSeed(),
    randomShadow: false, // true, // floorRandom(10) === 1,
    rotateEachStep: floorRandomNegate(Math.PI),
    rotation: floorRandom(Math.PI * 2),
    shadowBlur: floorRandom(5),
    shadowColor,
    shadowInset: true,
    shadowOffsetX: floorRandomNegate(40),
    shadowOffsetY: floorRandomNegate(40),
    shadowOpacity: Math.random() * 10 === 0 ? 0 : Math.random().toFixed(4),
    sharedPointDeviation: floorRandom(2) === 1,
    stepCenterDeviationX: floorRandomNegate(stepCenterMaxDeviationX),
    stepCenterDeviationY: floorRandomNegate(stepCenterMaxDeviationY),
    stepCenterDeviationDropOff: 1, // (Math.random() * 2) - 1,
    stepLength: 2 + floorRandom((Math.min(height, width) / 3) / amountOfSteps),
    stepLengthDropOff: (Math.random() * 2),
    strokePath: floorRandom(8) === 1 // 1/8 chance for a stroke instead of a fill.
  };
};

export const generateRandomShape = (width, height) => {
  const shape = generateRandomShapeConfig(width, height);

  shape.steps = buildSteps(shape);

  return shape;
}

// export const buildShapes = (shapeConfig) => {
//   return [];
// }