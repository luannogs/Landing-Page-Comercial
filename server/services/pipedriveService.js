const axios = require('axios');
const FormData = require('form-data');

const BASE_URL = `https://${process.env.PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com/api/v1`;
const API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;

/**
 * Cria uma pessoa, um lead e anexa arquivo no Pipedrive.
 */
exports.createLead = async ({ name, email, phone, personType, file }) => {
    // 1. Cria a pessoa no Pipedrive
    const personPayload = {
        name,
        email: [{ value: email, primary: true }],
        ...(phone && { phone: [{ value: phone, primary: true }] }),
    };

    const labelId = '95d8226e0f77e5a35d5b1db96a2b97f95263853f';

    const { data: personResponse } = await axios.post(
        `${BASE_URL}/persons?api_token=${API_TOKEN}`,
        personPayload
    );

    const personId = personResponse.data.id;
    // 2. Cria o lead associado à pessoa
    const leadPayload = {
        title: `Lead ADEEL (${personType === 'J' ? 'PJ' : 'PF'}) - ${name}`,
        person_id: personId,
        [labelId]: '956'
    }


    const { data: leadResponse } = await axios.post(
        `${BASE_URL}/leads?api_token=${API_TOKEN}`,
        leadPayload
    );

    const leadId = leadResponse.data.id;

    console.log('[PipedriveService] Lead criado:', leadId);

    // 3. Se houver arquivo (fatura), faz o upload vinculado ao lead
    if (file) {
        const form = new FormData();
        form.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        // No Pipedrive, o campo é 'item_type' (lead ou deal) e 'item_id'
        form.append('item_type', 'lead');
        form.append('item_id', leadId);

        await axios.post(`${BASE_URL}/files?api_token=${API_TOKEN}`, form, {
            headers: form.getHeaders(),
        });
        console.log('[PipedriveService] Arquivo anexado ao lead.');
    }

    return leadResponse.data;
};
