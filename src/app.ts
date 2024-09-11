import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import usersRoutes from "./controllers/users.controller";
import uploadsRoutes from "./controllers/uploads.controller";

export const app = express();

// Init app express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 5001;

// Variable globale
app.locals.color = {
  luminance: 63,
  greenRed: 44,
  blueYellow: -18,
};

// Route de test pour vérifier la variable globale
app.get("/test", (req, res) => {
  res.send(`Hello, World! Variable globale: ${app.locals.globalVariable}`);
});

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/uploads", uploadsRoutes);

// Middleware de gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: "Something went wrong", error: err.message });
});

// Bootstraping
async function bootstrap(): Promise<void> {
  try {
    // Connexion à la base de donnée (Attente de la connexion avant de passer à la suite)
    await AppDataSource.initialize().then(() => {
      console.log("DB connected");
    });
    // Start Express server
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("DB connexion failed");
    console.log(error);
  }
}

// Call the bootstrap function to start the application
bootstrap();
