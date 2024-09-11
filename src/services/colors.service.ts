import { ColorLab } from "../types/color";

export const generateRandomLBAColor = () => {
  // Générer des valeurs aléatoires pour luminance, greenRed et blueYellow
  const luminance = Math.floor(Math.random() * 256); // Valeurs entre 0 et 255
  const greenRed = Math.floor(Math.random() * 256) - 128; // Valeurs entre -128 et 127
  const blueYellow = Math.floor(Math.random() * 256) - 128; // Valeurs entre -128 et 127

  const color: ColorLab = {
    luminance,
    greenRed,
    blueYellow,
  };

  return color;
};
