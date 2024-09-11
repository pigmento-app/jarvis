import express, { Request, Response } from "express";
import { app } from "../app";
import { ColorLab } from "../types/color";
import * as colorsService from "../services/colors.service";

const router = express.Router();

// Route pour recevoir un fichier
router.get("/", async (req: Request, res: Response) => {
  const color: ColorLab = app.locals.color;
  try {
    const rgbColor = colorsService.convertLABToRGB(Object.values(color));
    const rgbString = `rgb(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]})`;
    res.status(200).json({
      color: rgbString,
    });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération de la couleur.");
  }
});

export default router;
