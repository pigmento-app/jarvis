import { ColorLab } from "../types/color";

export const generateRandomLBAColor = () => {
  // Générer des valeurs aléatoires pour luminance, greenRed et blueYellow
  const luminance = Math.floor(Math.random() * 101); // Valeurs entre 0 et 100
  const greenRed = Math.floor(Math.random() * 256) - 128; // Valeurs entre -128 et 127
  const blueYellow = Math.floor(Math.random() * 256) - 128; // Valeurs entre -128 et 127

  const color: ColorLab = {
    luminance,
    greenRed,
    blueYellow,
  };

  return color;
};

export const convertLABToRGB = (lab: number[]): number[] => {
  let [l, gr, by] = lab;

  // Convert LAB to XYZ
  let y = (l + 16) / 116;
  let x = gr / 500 + y;
  let z = y - by / 200;

  const xyz = [x, y, z].map(function (value) {
    const valueCubed = Math.pow(value, 3);
    return valueCubed > 0.008856 ? valueCubed : (value - 16 / 116) / 7.787;
  });

  x = xyz[0] * 95.047;
  y = xyz[1] * 100.0;
  z = xyz[2] * 108.883;

  // Convert XYZ to RGB
  x /= 100;
  y /= 100;
  z /= 100;

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;

  [r, g, b] = [r, g, b].map(function (value) {
    return value > 0.0031308
      ? 1.055 * Math.pow(value, 1 / 2.4) - 0.055
      : value * 12.92;
  });

  [r, g, b] = [r, g, b].map(function (value) {
    return Math.min(Math.max(0, value), 1) * 255;
  });

  return [Math.round(r), Math.round(g), Math.round(b)];
};
