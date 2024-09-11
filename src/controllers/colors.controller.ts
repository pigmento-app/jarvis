import express, { Request, Response } from "express";
import { app } from "../app";
import { ColorLab } from "../types/color";

const router = express.Router();

// Route pour recevoir un fichier
router.get("/", async (req: Request, res: Response) => {
  const color: ColorLab = app.locals.color;
  try {
    res.status(200).json({
      color: Object.values(color),
    });
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération de la couleur.");
  }
});

export default router;
