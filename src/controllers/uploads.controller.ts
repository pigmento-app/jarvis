import express, { Request, Response } from "express";
import multer from "multer";
import FormData from "form-data";
import * as service from "../services/scores.service";
import * as morpheusService from "../services/morpheus.service";
import { app } from "../app";

const router = express.Router();

// Configuration de multer pour le stockage temporaire des fichiers reçus
const upload = multer({ dest: "uploads/" });

// Route pour recevoir un fichier
router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const color = app.locals.color;
  // Le fichier est accessible via req.file
  const file = req.file;

  if (!file) {
    return res.status(400).send({ error: "Aucun fichier reçu." });
  }

  try {
    // Transfert du fichier vers Morpheus pour analyse
    const imageAnalyseInfos = await morpheusService.analyseImage(file, color);

    // Calcul du score
    const score = service.calculateScore(imageAnalyseInfos);

    // Si la requête vers l'autre API est un succès
    res.status(200).json({
      score,
    });
  } catch (error) {
    console.error("Erreur lors du transfert du fichier:", error);
    res.status(500).send("Erreur lors du transfert du fichier.");
  }
});

export default router;
