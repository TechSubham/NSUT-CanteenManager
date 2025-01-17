const admin = require('firebase-admin');

const serviceAccount = require('./service-key.json');

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