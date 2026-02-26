const axios = require('axios');
const FormData = require('form-data');

const BASE_URL = `https://${process.env.PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com/api/v1`;
const API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;

/**
 * Cria uma pessoa, um lead e anexa arquivo no Pipedrive.
 */
exports.createLead = async ({ name, email, phone, personType, file }) => {
    try {
        // 1. Cria a pessoa no Pipedrive
        console.log('[PipedriveService] Criando pessoa...');
        const personPayload = {
            name,
            email: [{ value: email, primary: true }],
            ...(phone && { phone: [{ value: phone, primary: true }] }),
        };

        const { data: personResponse } = await axios.post(
            `${BASE_URL}/persons?api_token=${API_TOKEN}`,
            personPayload
        );

        const personId = personResponse.data.id;
        console.log('[PipedriveService] Pessoa criada ID:', personId);

        // 2. Cria o lead associado à pessoa
        console.log('[PipedriveService] Criando lead...');

        // Chave do campo customizado (conforme conversas anteriores)
        const customLabelKey = '95d8226e0f77e5a35d5b1db96a2b97f95263853f';

        const leadPayload = {
            title: `Lead ADEEL (${personType === 'J' ? 'PJ' : 'PF'}) - ${name}`,
            person_id: personId,
            // Tenta enviar como array se for do tipo 'set'
            [customLabelKey]: '956'
        }

        const { data: leadResponse } = await axios.post(
            `${BASE_URL}/leads?api_token=${API_TOKEN}`,
            leadPayload
        );

        const leadId = leadResponse.data.id;
        console.log('[PipedriveService] Lead criado ID:', leadId);

        // 3. Se houver arquivo (fatura), faz o upload vinculado ao lead
        if (file) {
            console.log('[PipedriveService] Fazendo upload de arquivo...');
            const form = new FormData();
            form.append('file', file.buffer, {
                filename: file.originalname,
                contentType: file.mimetype,
            });

            // Conforme a documentação do Pipedrive para vinculação a LEADS
            form.append('lead_id', leadId);

            await axios.post(`${BASE_URL}/files?api_token=${API_TOKEN}`, form, {
                headers: form.getHeaders(),
            });
            console.log('[PipedriveService] Arquivo anexado com sucesso.');
        }

        return leadResponse.data;
    } catch (error) {
        if (error.response) {
            console.error('[PipedriveService] Erro da API Pipedrive:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('[PipedriveService] Erro inesperado:', error.message);
        }
        throw error;
    }
};
