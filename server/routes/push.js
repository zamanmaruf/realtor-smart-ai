const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

// VAPID keys (generate these for production)
const vapidKeys = webpush.generateVAPIDKeys();

// Configure web-push
webpush.setVapidDetails(
    'mailto:info@realtorsmartai.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const subscriptionsFilePath = path.join(__dirname, '../data/subscriptions.json');

// Ensure data directory exists
const ensureDataFile = () => {
    const dataDir = path.dirname(subscriptionsFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(subscriptionsFilePath)) {
        fs.writeFileSync(subscriptionsFilePath, JSON.stringify([], null, 2));
    }
};

// Subscribe to push notifications
router.post('/subscribe', (req, res) => {
    try {
        ensureDataFile();
        
        const { subscription } = req.body;
        
        if (!subscription) {
            return res.status(400).json({
                success: false,
                message: 'Subscription is required'
            });
        }

        // Read existing subscriptions
        const existingSubscriptions = JSON.parse(fs.readFileSync(subscriptionsFilePath, 'utf8'));
        
        // Check if subscription already exists
        const exists = existingSubscriptions.find(sub => 
            sub.endpoint === subscription.endpoint
        );
        
        if (!exists) {
            // Add new subscription
            existingSubscriptions.push({
                id: Date.now().toString(),
                subscription: subscription,
                timestamp: new Date().toISOString()
            });
            
            // Write back to file
            fs.writeFileSync(subscriptionsFilePath, JSON.stringify(existingSubscriptions, null, 2));
        }

        res.json({
            success: true,
            message: 'Successfully subscribed to push notifications',
            publicKey: vapidKeys.publicKey
        });

    } catch (error) {
        console.error('Error subscribing to push notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error subscribing to push notifications'
        });
    }
});

// Unsubscribe from push notifications
router.post('/unsubscribe', (req, res) => {
    try {
        ensureDataFile();
        
        const { subscription } = req.body;
        
        if (!subscription) {
            return res.status(400).json({
                success: false,
                message: 'Subscription is required'
            });
        }

        // Read existing subscriptions
        const existingSubscriptions = JSON.parse(fs.readFileSync(subscriptionsFilePath, 'utf8'));
        
        // Remove subscription
        const filteredSubscriptions = existingSubscriptions.filter(sub => 
            sub.subscription.endpoint !== subscription.endpoint
        );
        
        // Write back to file
        fs.writeFileSync(subscriptionsFilePath, JSON.stringify(filteredSubscriptions, null, 2));

        res.json({
            success: true,
            message: 'Successfully unsubscribed from push notifications'
        });

    } catch (error) {
        console.error('Error unsubscribing from push notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Error unsubscribing from push notifications'
        });
    }
});

// Send push notification to all subscribers
router.post('/send', (req, res) => {
    try {
        ensureDataFile();
        
        const { title, body, icon, url } = req.body;
        
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: 'Title and body are required'
            });
        }

        // Read existing subscriptions
        const subscriptions = JSON.parse(fs.readFileSync(subscriptionsFilePath, 'utf8'));
        
        const payload = JSON.stringify({
            title: title,
            body: body,
            icon: icon || '/icon-192.png',
            url: url || '/',
            timestamp: new Date().toISOString()
        });

        // Send to all subscribers
        const promises = subscriptions.map(sub => {
            return webpush.sendNotification(sub.subscription, payload)
                .catch(error => {
                    console.error('Error sending notification:', error);
                    // Remove invalid subscriptions
                    if (error.statusCode === 410) {
                        const filteredSubscriptions = subscriptions.filter(s => 
                            s.subscription.endpoint !== sub.subscription.endpoint
                        );
                        fs.writeFileSync(subscriptionsFilePath, JSON.stringify(filteredSubscriptions, null, 2));
                    }
                });
        });

        Promise.all(promises).then(() => {
            res.json({
                success: true,
                message: `Notification sent to ${subscriptions.length} subscribers`
            });
        });

    } catch (error) {
        console.error('Error sending push notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending push notification'
        });
    }
});

// Get VAPID public key
router.get('/vapidPublicKey', (req, res) => {
    res.json({
        success: true,
        publicKey: vapidKeys.publicKey
    });
});

// Get all subscriptions (admin only)
router.get('/subscriptions', (req, res) => {
    try {
        ensureDataFile();
        
        const subscriptions = JSON.parse(fs.readFileSync(subscriptionsFilePath, 'utf8'));
        
        res.json({
            success: true,
            subscriptions: subscriptions
        });

    } catch (error) {
        console.error('Error reading subscriptions:', error);
        res.status(500).json({
            success: false,
            message: 'Error reading subscriptions'
        });
    }
});

module.exports = router; 