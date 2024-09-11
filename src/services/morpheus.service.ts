import { ColorLab } from "../types/color";
import { ImageAnalyseInfos } from "../types/image";

// Fonction pour envoyer le fichier vers une autre API
export const analyseImage = async (
  file: Express.Multer.File,
  color: ColorLab
): Promise<ImageAnalyseInfos> => {
  // ! A faire la requête pour envoyer l'image et la couleur à Morpheus
  console.log("FILE:", file);
  console.log("COLOR:", color);
  return {
    average_distance: 7,
    color: [63, 44, -18],
    number_of_pixel_with_delta_minus_or_equal_20: 88356,
    number_of_pixel_with_delta_minus_or_equal_5: 0,
  };
  // Créez un objet FormData pour envoyer le fichier vers l'autre API
  // const formData = new FormData();
  // formData.append("file", fs.createReadStream(file.path)); // Lecture du fichier temporaire
  // // Envoyez le fichier via axios à l'autre API
  // const response = await axios.post(
  //   "https://exemple.com/api/upload",
  //   formData,
  //   {
  //     headers: {
  //       ...formData.getHeaders(),
  //     },
  //   }
  // );
  // // Suppression du fichier temporaire après l'envoi (optionnel)
  // fs.unlink(file.path, (err) => {
  //   if (err)
  //     console.error(
  //       "Erreur lors de la suppression du fichier temporaire:",
  //       err
  //     );
  // });
};
