import express, { Request, Response } from 'express';
import cron from 'node-cron';
import Expo from 'expo-server-sdk';

const expo = new Expo();

const tokens: string[] = [];

const router = express.Router();

router.post('/register', (req: Request, res: Response) => {
	if (tokens.includes(req.body.token)) {
		console.log('Token already registered:', req.body.token);

		return;
	}

	tokens.push(req.body.token);
	console.log('Token registered:', req.body.token);
});

const sendNotificationWithResponse = async (res: Response) => {
	// Filter out invalid tokens
	const validTokens = tokens.filter((token) => Expo.isExpoPushToken(token));

	if (validTokens.length === 0) {
		return res.status(400).send('No valid Expo push tokens provided');
	}

	try {
		sendNotification();

		res.status(200).send('Notifications sent');
	} catch (error) {
		console.error('Error sending notifications:', error);
		res.status(500).send('Error sending notifications');
	}
};

const sendNotification = async () => {
	const validTokens = tokens.filter((token) => Expo.isExpoPushToken(token));

	// Create messages for each token
	const messages = validTokens.map((token) => ({
		to: token,
		title: '⚠️ Time to Pigmento ⚠️',
		body: '5 min left to capture a Pigmento and see how close you were to the real color!',
	}));

	// Send notifications
	const chunks = expo.chunkPushNotifications(messages);
	const tickets = [];
	for (const chunk of chunks) {
		const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
		tickets.push(...ticketChunk);
	}

	console.log('Notifications sent:', tickets);
};

router.get('/testSend', (req: Request, res: Response) => {
	console.log('Sending to tokens:' + tokens);
	sendNotificationWithResponse(res);
});

cron.schedule('0 9-22 * * *', sendNotification);

export default router;
