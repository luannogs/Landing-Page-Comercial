const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');

// POST /api/leads  → cria um novo lead no Pipedrive
router.post('/', leadsController.createLead);

module.exports = router;
