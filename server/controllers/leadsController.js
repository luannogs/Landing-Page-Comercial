const pipedriveService = require('../services/pipedriveService');
const emailService = require('../services/emailService');

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

        // 1. Cria o lead no Pipedrive
        const result = await pipedriveService.createLead({
            name,
            email,
            phone,
            personType,
            file
        });

        // 2. Envia o e-mail com os dados do lead
        // Disparamos sem aguardar o retorno (opcional) ou aguardamos se quisermos garantir o envio
        // Aqui vou aguardar para garantir que logamos o sucesso/falha
        await emailService.sendLeadEmail({
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
