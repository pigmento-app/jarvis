import { ColorLab } from "../types/color";
import { ImageAnalyseInfos } from "../types/image";
import http from "http";
import fs from "fs";
import path from "path";

// Fonction pour nettoyer le dossier uploads
const cleanUploads = () => {
  const uploadsDir = path.join(__dirname, "../../uploads");

  fs.readdir(uploadsDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(uploadsDir, file), (err) => {
        if (err) throw err;
        console.log(`${file} supprimé.`);
      });
    }
  });
};

// Fonction pour envoyer le fichier vers une autre API
export const analyseImage = async (
  file: Express.Multer.File,
  color: ColorLab
): Promise<ImageAnalyseInfos> => {
  return new Promise((resolve, reject) => {
    const boundary = "----WebKitFormBoundary" + Math.random().toString(16);
    const fileStream = fs.createReadStream(file.path);

    console.log("FILE SIZE", file.size);

    const options = {
      hostname: "192.168.243.211",
      port: 5080,
      path: "/distance_color",
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const dataObject = JSON.parse(data);
          resolve({
            average_distance_max_delta_percent:
              dataObject.average_distance_max_delta_percent,
            color: dataObject.color,
            number_of_pixel_with_delta_upper_90_percent_max_delta:
              dataObject.number_of_pixel_with_delta_upper_90_percent_max_delta,
            number_of_pixel_with_delta_90_80_percent_max_delta:
              dataObject.number_of_pixel_with_delta_90_80_percent_max_delta,
            number_of_pixel_with_delta_80_70_percent_max_delta:
              dataObject.number_of_pixel_with_delta_80_70_percent_max_delta,
            number_of_pixel_with_delta_70_60_percent_max_delta:
              dataObject.number_of_pixel_with_delta_70_60_percent_max_delta,
            number_of_pixel_with_delta_60_50_percent_max_delta:
              dataObject.number_of_pixel_with_delta_60_50_percent_max_delta,
            number_of_pixel_with_delta_50_40_percent_max_delta:
              dataObject.number_of_pixel_with_delta_50_40_percent_max_delta,
            number_of_pixel_with_delta_40_30_percent_max_delta:
              dataObject.number_of_pixel_with_delta_40_30_percent_max_delta,
            number_of_pixel_with_delta_30_20_percent_max_delta:
              dataObject.number_of_pixel_with_delta_30_20_percent_max_delta,
            number_of_pixel_with_delta_20_10_percent_max_delta:
              dataObject.number_of_pixel_with_delta_20_10_percent_max_delta,
            number_of_pixel_with_delta_minus_or_equal_10_percent_max_delta:
              dataObject.number_of_pixel_with_delta_minus_or_equal_10_percent_max_delta,
            size: dataObject.size,
          });

          // Nettoyer le dossier après la réponse du serveur
          cleanUploads();
        } catch (error: any) {
          reject(`Erreur lors de l'analyse de la réponse : ${error.message}`);
        }
      });
    });

    req.on("error", (e) => {
      reject(`Erreur de requête : ${e.message}`);
    });

    // FormData multipart
    req.write(`--${boundary}\r\n`);
    req.write(
      `Content-Disposition: form-data; name="image"; filename="${file.filename}"\r\n`
    );
    req.write(`Content-Type: ${file.mimetype}\r\n\r\n`);

    // Envoyer l'image
    fileStream.pipe(req, { end: false });
    fileStream.on("end", () => {
      req.write(`\r\n--${boundary}\r\n`);
      req.write(
        `Content-Disposition: form-data; name="luminance"\r\n\r\n${color.luminance}\r\n`
      );
      req.write(`--${boundary}\r\n`);
      req.write(
        `Content-Disposition: form-data; name="greenRed"\r\n\r\n${color.greenRed}\r\n`
      );
      req.write(`--${boundary}\r\n`);
      req.write(
        `Content-Disposition: form-data; name="blueYellow"\r\n\r\n${color.blueYellow}\r\n`
      );
      req.write(`--${boundary}--\r\n`);
      req.end();
    });
  });
};
