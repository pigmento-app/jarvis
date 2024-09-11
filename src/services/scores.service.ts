import { ImageAnalyseInfos } from "../types/image";

export const calculateScore = (imageInfos: ImageAnalyseInfos) => {
  if(imageInfos.number_of_pixel_with_delta_minus_or_equal_20 > 0.2 * 600){
    if(imageInfos.number_of_pixel_with_delta_minus_or_equal_5 > 0.1 * 600){
      console.log("Score : ", 100)
      return(100)
    }else{
      console.log("Score : ", 100 - imageInfos.average_distance)
      return(100 - imageInfos.average_distance)
    }
  }else{
    console.log("Score : ", 100 - imageInfos.average_distance)
    return(100 - imageInfos.average_distance)
  }
};
