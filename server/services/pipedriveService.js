const axios = require('axios');

const BASE_URL = `https://${process.env.PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com/api/v1`;
const API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;

/**
 * Cria uma pessoa e um lead no Pipedrive.
 * @param {{ name: string, email: string, phone?: string, company?: string, message?: string }} leadData
 */
exports.createLead = async ({ name, email, phone, company, message }) => {
    // 1. Cria a pessoa no Pipedrive
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

    // 2. Cria o lead associado à pessoa
    const leadPayload = {
        title: `Lead - ${name}`,
        person_id: personId,
        ...(company && { organization_id: null }), // substituir por org se necessário
    };

    const { data: leadResponse } = await axios.post(
        `${BASE_URL}/leads?api_token=${API_TOKEN}`,
        leadPayload
    );

    return leadResponse.data;
};
