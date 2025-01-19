const admin = require('firebase-admin');
require('dotenv').config();

// dot env file is containing the api keys
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
                title: `🌟 ${title} 🌟`, 
                body: `📢 ${body}\n\n✨ Thank you for staying updated! ✨`, 
            },
            topic: 'newItems',
            android: {
                notification: {
                    color: '#4CAF50', 
                    icon: 'ic_notification', 
                    sound: 'default', 
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                    },
                },
            },
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