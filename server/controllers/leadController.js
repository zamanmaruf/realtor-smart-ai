const fs = require('fs');
const path = require('path');

const leadsFilePath = path.join(__dirname, '../data/leads.json');

// Ensure data directory exists
const ensureDataFile = () => {
    const dataDir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(leadsFilePath)) {
        fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2));
    }
};

// Create a new lead
const createLead = (req, res) => {
    try {
        ensureDataFile();
        
        const { 
            name, 
            email, 
            phone, 
            budget, 
            timeline,
            preApproved,
            propertyType,
            location,
            source,
            referralCode
        } = req.body;
        
        // Validate required fields
        if (!name || !email || !phone || !budget || !timeline || !preApproved || !propertyType) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be filled'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid phone number'
            });
        }

        const newLead = {
            id: Date.now().toString(),
            name,
            email,
            phone,
            budget,
            timeline,
            preApproved,
            propertyType,
            location: location || 'Not specified',
            source: source || 'website',
            referralCode: referralCode || '',
            timestamp: new Date().toISOString()
        };

        // Read existing leads
        const existingLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
        
        // Add new lead
        existingLeads.push(newLead);
        
        // Write back to file
        fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2));

        // TODO: Send email notification to agent
        // sendEmailNotification(newLead);

        res.status(201).json({
            success: true,
            message: 'Lead captured successfully!',
            lead: newLead
        });

    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving lead'
        });
    }
};

// Get all leads
const getLeads = (req, res) => {
    try {
        ensureDataFile();
        
        const leads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
        
        res.json({
            success: true,
            leads: leads
        });

    } catch (error) {
        console.error('Error reading leads:', error);
        res.status(500).json({
            success: false,
            message: 'Error reading leads'
        });
    }
};

// Delete a lead
const deleteLead = (req, res) => {
    try {
        ensureDataFile();
        
        const { id } = req.params;
        
        // Read existing leads
        const existingLeads = JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'));
        
        // Find and remove the lead
        const updatedLeads = existingLeads.filter(lead => lead.id !== id);
        
        if (updatedLeads.length === existingLeads.length) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }
        
        // Write back to file
        fs.writeFileSync(leadsFilePath, JSON.stringify(updatedLeads, null, 2));

        res.json({
            success: true,
            message: 'Lead deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting lead'
        });
    }
};

// Email notification function (placeholder for future implementation)
const sendEmailNotification = (lead) => {
    // TODO: Implement email sending using SendGrid, EmailJS, or similar
    console.log('Email notification would be sent for lead:', lead);
};

module.exports = {
    createLead,
    getLeads,
    deleteLead
}; 