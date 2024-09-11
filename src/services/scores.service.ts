import { ImageAnalyseInfos } from "../types/image";

export const calculateScore = (imageInfos: ImageAnalyseInfos) => {
  console.log(imageInfos)
  let scoreMoyenne = 100 - imageInfos.average_distance
  if(scoreMoyenne<0){
    scoreMoyenne = 0
  }
  if(imageInfos.number_of_pixel_with_delta_minus_or_equal_20 > 0.2 * 600 && imageInfos.number_of_pixel_with_delta_minus_or_equal_5 > 0.1 * 600){
    scoreMoyenne = 100
    return(100)
  }
  console.log("Score : ", scoreMoyenne)
  return(scoreMoyenne)
};
