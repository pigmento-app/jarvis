import { ImageAnalyseInfos } from "../types/image";

// export const calculateScore = (imageInfos: ImageAnalyseInfos) => {
//   console.log("IMAGE INFOS", imageInfos);
//   let scoreMoyenne = 0;

//   if (imageInfos.average_distance_max_delta_percent < 50) {
//     scoreMoyenne += 50 - imageInfos.average_distance_max_delta_percent;
//   }

//   const number_of_pixel_on_20_percent_size = imageInfos.size * 0.15;
//   console.log("Number size 20", number_of_pixel_on_20_percent_size);

//   const penality = (imageInfos.average_distance_max_delta_percent / 100) * 20;

//   const scorePixel8070 =
//     ((imageInfos.number_of_pixel_with_delta_80_70_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     0.3;
//   const scorePixel7060 =
//     ((imageInfos.number_of_pixel_with_delta_70_60_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     0.8;
//   const scorePixel6050 =
//     ((imageInfos.number_of_pixel_with_delta_60_50_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     0.9;
//   const scorePixel5040 =
//     ((imageInfos.number_of_pixel_with_delta_50_40_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     1;
//   const scorePixel4030 =
//     ((imageInfos.number_of_pixel_with_delta_40_30_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     5;
//   const scorePixel3020 =
//     ((imageInfos.number_of_pixel_with_delta_30_20_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     10;
//   const scorePixel2010 =
//     ((imageInfos.number_of_pixel_with_delta_20_10_percent_max_delta * 100) /
//       number_of_pixel_on_20_percent_size) *
//     50;
//   const scorePixelMinus10 =
//     ((imageInfos.number_of_pixel_with_delta_minus_or_equal_10_percent_max_delta *
//       100) /
//       number_of_pixel_on_20_percent_size) *
//     100;

//   console.log("Score pixel 8070 : ", scorePixel8070);
//   console.log("Score pixel 7060 : ", scorePixel7060);
//   console.log("Score pixel 6050 : ", scorePixel6050);
//   console.log("Score pixel 5040 : ", scorePixel5040);
//   console.log("Score pixel 4030 : ", scorePixel4030);
//   console.log("Score pixel 3020 : ", scorePixel3020);
//   console.log("Score pixel 2010 : ", scorePixel2010);
//   console.log("Score pixel -10 : ", scorePixelMinus10);

//   scoreMoyenne =
//     scorePixel8070 +
//     scorePixel7060 +
//     scorePixel6050 +
//     scorePixel5040 +
//     scorePixel4030 +
//     scorePixel3020 +
//     scorePixel2010 +
//     scorePixelMinus10;

//   // Limiter le score final à 100
//   scoreMoyenne = Math.min(100, scoreMoyenne);

//   console.log("SCORE MOYEN AVANT PENALITE", scoreMoyenne);
//   console.log("PENALITE", penality);

//   // Ajouter une penalité en pour eviter les écart de couleur gagnant
//   if (
//     imageInfos.number_of_pixel_with_delta_20_10_percent_max_delta === 0 &&
//     imageInfos.number_of_pixel_with_delta_minus_or_equal_10_percent_max_delta ===
//       0
//   ) {
//     scoreMoyenne -= penality;
//   }
//   // Garantir un score minimum pour éviter les résultats trop bas dans les cas proches
//   scoreMoyenne = Math.max(0, scoreMoyenne);

//   console.log("Score : ", scoreMoyenne);
//   return scoreMoyenne;
// };

export const calculateScore = (imageInfos: ImageAnalyseInfos) => {
  console.log("IMAGE INFOS", imageInfos);
  let scoreMoyenne = 0;

  const steps: { [key: string]: number } = {
    pal_upper_90:
      imageInfos.number_of_pixel_with_delta_upper_90_percent_max_delta,
    pal_90_80: imageInfos.number_of_pixel_with_delta_90_80_percent_max_delta,
    pal_80_70: imageInfos.number_of_pixel_with_delta_80_70_percent_max_delta,
    pal_70_60: imageInfos.number_of_pixel_with_delta_70_60_percent_max_delta,
    pal_60_50: imageInfos.number_of_pixel_with_delta_60_50_percent_max_delta,
    pal_50_40: imageInfos.number_of_pixel_with_delta_50_40_percent_max_delta,
    pal_40_30: imageInfos.number_of_pixel_with_delta_40_30_percent_max_delta,
    pal_30_20: imageInfos.number_of_pixel_with_delta_30_20_percent_max_delta,
    pal_20_10: imageInfos.number_of_pixel_with_delta_20_10_percent_max_delta,
  };

  const maxStepValue = Math.max(...Object.values(steps));
  const maxStepKey = Object.keys(steps).find(
    (key) => steps[key] === maxStepValue
  );

  console.log(
    "Le step le plus grand est:",
    maxStepKey,
    "avec une valeur de:",
    maxStepValue
  );

  if (maxStepKey === "pal_upper_90" && maxStepValue < imageInfos.size * 0.95) {
    scoreMoyenne = 10;
  }
  if (
    imageInfos.number_of_pixel_with_delta_90_80_percent_max_delta >=
      imageInfos.size * 0.05 ||
    maxStepKey === "pal_90_80"
  ) {
    scoreMoyenne = 20;
  }
  if (
    imageInfos.number_of_pixel_with_delta_90_80_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_80_70_percent_max_delta >=
      imageInfos.size * 0.05 ||
    maxStepKey === "pal_80_70"
  ) {
    scoreMoyenne = 30;
  }
  if (
    imageInfos.number_of_pixel_with_delta_80_70_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_70_60_percent_max_delta >=
      imageInfos.size * 0.05 ||
    maxStepKey === "pal_70_60"
  ) {
    scoreMoyenne = 40;
  }
  if (
    imageInfos.number_of_pixel_with_delta_70_60_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_60_50_percent_max_delta >=
      imageInfos.size * 0.05 ||
    maxStepKey === "pal_60_50"
  ) {
    scoreMoyenne = 50;
  }
  if (
    imageInfos.number_of_pixel_with_delta_60_50_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_50_40_percent_max_delta >=
      imageInfos.size * 0.05 ||
    maxStepKey === "pal_50_40"
  ) {
    scoreMoyenne = 60;
  }
  if (
    imageInfos.number_of_pixel_with_delta_50_40_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_40_30_percent_max_delta >=
      imageInfos.size * 0.025 ||
    maxStepKey === "pal_40_30"
  ) {
    scoreMoyenne = 70;
  }
  if (
    maxStepKey === "pal_30_20" ||
    imageInfos.number_of_pixel_with_delta_40_30_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_30_20_percent_max_delta >=
      imageInfos.size * 0.015
  ) {
    scoreMoyenne = 80;
  }
  if (
    maxStepKey === "pal_20_10" ||
    imageInfos.number_of_pixel_with_delta_20_10_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_30_20_percent_max_delta >=
      imageInfos.size * 0.015
  ) {
    scoreMoyenne = 90;
  }
  if (
    imageInfos.number_of_pixel_with_delta_20_10_percent_max_delta +
      imageInfos.number_of_pixel_with_delta_minus_or_equal_10_percent_max_delta >=
    imageInfos.size * 0.01
  ) {
    scoreMoyenne = 100;
  }

  console.log("Score : ", scoreMoyenne);
  return scoreMoyenne;
};
