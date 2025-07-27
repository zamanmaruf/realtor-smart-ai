const express = require('express');
const router = express.Router();
const { createLead, getLeads, deleteLead } = require('../controllers/leadController');

// POST /api/leads - Create a new lead
router.post('/', createLead);

// GET /api/leads - Get all leads
router.get('/', getLeads);

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', deleteLead);

module.exports = router; 