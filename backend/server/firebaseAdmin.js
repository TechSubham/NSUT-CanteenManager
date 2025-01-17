const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const subscribeToTopic = async (token) => {
    try {
        await admin.messaging().subscribeToTopic([token], 'newItems');
        console.log('Successfully subscribed to topic');
    } catch (error) {
        console.error('Error subscribing to topic:', error);
        throw error;
    }
};

const sendNotification = async (title, body) => {
    try {
        const message = {
            notification: {
                title,
                body,
            },
            topic: 'newItems'
        };

        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

module.exports = { sendNotification, subscribeToTopic };