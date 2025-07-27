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
app.use(express.static(path.join(__dirname, '../public')));

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

// API Routes
const leadsRoutes = require('./routes/leads');
const chatbotRoutes = require('./routes/chatbot');
const pushRoutes = require('./routes/push');

app.use('/api/leads', leadsRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api/push', pushRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RealtorSmart AI server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/admin`);
}); 