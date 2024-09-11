import express, { Request, Response } from 'express';
import admin from 'firebase-admin';
import cron from 'node-cron';

const serviceAccount = require('./firebase.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const tokens: string[] = [];

const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
	tokens.push(req.body.token);
	res.status(200).json({ message: 'Successfully registered FCM Token!' });
});

const sendNotification = async () => {
	try {
		await admin.messaging().sendEachForMulticast({
			tokens,
			notification: {
				title: 'New Notification',
				body: 'This is a new notification!',
				imageUrl: 'https://via.placeholder.com/150',
			},
		});
	} catch (err) {
		console.error(err);
	}
};

cron.schedule('0 9-22 * * *', sendNotification);

export default router;
