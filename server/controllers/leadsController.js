const pipedriveService = require('../services/pipedriveService');

/**
 * POST /api/leads
 * Body esperado: { name, email, phone, company, message }
 */
exports.createLead = async (req, res) => {
    try {
        const { name, email, phone, personType } = req.body;
        const file = req.file;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Nome e e-mail são obrigatórios.' });
        }

        const result = await pipedriveService.createLead({
            name,
            email,
            phone,
            personType,
            file
        });

        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error('[LeadsController] Erro ao criar lead:', error.message);
        return res.status(500).json({ success: false, message: 'Erro interno ao processar o lead.' });
    }
};
