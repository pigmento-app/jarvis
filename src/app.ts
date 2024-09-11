import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as http from 'http';
import usersRoutes from './controllers/users.controller';
import notificationsRoute from './controllers/notifications.controller';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5001;

app.get('/test', (req, res) => {
	res.send('Hello, World!');
});

// Montez les routes des utilisateurs et des conversations sur votre application
app.use('/api/users', usersRoutes);

// Montez les routes des notifications sur votre application
app.use('/api/notifications', notificationsRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err);
	res.status(500).send({ message: 'Something went wrong', error: err.message });
});

async function bootstrap(): Promise<void> {
	try {
		// Connexion à la base de donnée (Attente de la connexion avant de passer à la suite)
		await AppDataSource.initialize().then(() => {
			console.log('DB connected');
		});
		// Start Express server
		const server = app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	} catch (error) {
		console.log('DB connexion failed');
		console.log(error);
	}
}

// Call the bootstrap function to start the application
bootstrap();
