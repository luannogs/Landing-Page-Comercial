const express = require('express');
const router = express.Router();
const multer = require('multer');
const leadsController = require('../controllers/leadsController');

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/leads  → cria um novo lead no Pipedrive com upload de fatura
router.post('/', upload.single('file'), leadsController.createLead);

module.exports = router;
