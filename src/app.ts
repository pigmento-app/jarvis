import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as http from 'http';
import usersRoutes from './controllers/users.controller';
import notificationsRoute from './controllers/notifications.controller';
import uploadsRoutes from './controllers/uploads.controller';
import colorsRoutes from './controllers/colors.controller';
import * as colorsService from '../src/services/colors.service';
import bodyParser from 'body-parser';

export const app = express();

// Init app express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

// Variable globale
app.locals.color = colorsService.generateColorBasedOnDay();

// Route de test pour vérifier la variable globale
app.get('/test', (req, res) => {
	res.send(
		`Hello, World! The daily color has luminance: ${app.locals.color.luminance}, greenRed: ${app.locals.color.greenRed}, blueYellow: ${app.locals.color.blueYellow} `
	);
});

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/colors', colorsRoutes);
app.use('/api/notifications', notificationsRoute);

// Middleware de gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send({ message: 'Something went wrong', error: err.message });
});

// Bootstraping
async function bootstrap(): Promise<void> {
	try {
		// Connexion à la base de donnée (Attente de la connexion avant de passer à la suite)
		await AppDataSource.initialize().then(() => {
			console.log('DB connected');
		});
		// Start Express server
		const server = app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
			console.log(
				`The daily color has luminance: ${app.locals.color.luminance}, greenRed: ${app.locals.color.greenRed}, blueYellow: ${app.locals.color.blueYellow}`
			);
		});
	} catch (error) {
		console.log('DB connexion failed');
		console.log(error);
	}
}

// Call the bootstrap function to start the application
bootstrap();
