const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
        if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        }
    }
}));

// Also serve static files from root directory
app.use(express.static(path.join(__dirname, '..'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.setHeader('Content-Type', 'image/jpeg');
        }
        if (path.endsWith('.png')) {
            res.setHeader('Content-Type', 'image/png');
        }
    }
}));

// Serve HTML files from views directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
});

app.get('/test-bg', (req, res) => {
    res.sendFile(path.join(__dirname, '../test-bg.html'));
});

app.get('/test-static', (req, res) => {
    res.sendFile(path.join(__dirname, '../test-static.html'));
});

// Specific routes for images
app.get('/real-estate-bg.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/real-estate-bg.jpeg'));
});

app.get('/property1.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/property1.jpg'));
});

app.get('/property2.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/property2.jpg'));
});

app.get('/property3.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/property3.jpg'));
});

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'RealtorSmart AI is running!' });
});

// API Routes
const leadsRoutes = require('./routes/leads');
const chatbotRoutes = require('./routes/chatbot');
const pushRoutes = require('./routes/push');

app.use('/api/leads', leadsRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api/push', pushRoutes);

// Start server (only if not in Vercel environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 RealtorSmart AI server running on port ${PORT}`);
        console.log(`📱 Frontend: http://localhost:${PORT}`);
        console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/admin`);
    });
}

// Export for Vercel
module.exports = app; 