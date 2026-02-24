const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true para 465, false para outros como 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Envia um e-mail com os dados do lead.
 */
exports.sendLeadEmail = async ({ name, email, phone, personType, file }) => {
    try {
        const mailOptions = {
            from: `"Landing Page ADEEL" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO || 'novos.negocios@simplificaenergia.com.br',
            subject: `Novo Lead Capturado: ${name}`,
            text: `
                Novo lead capturado via Landing Page:
                
                Nome: ${name}
                E-mail: ${email}
                Telefone: ${phone || 'Não informado'}
                Tipo: ${personType === 'J' ? 'Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}
                ${file ? `Anexo: O lead enviou uma fatura (${file.originalname})` : 'Sem anexo.'}
            `,
            html: `
                <h2>Novo lead capturado via Landing Page</h2>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
                <p><strong>Tipo:</strong> ${personType === 'J' ? 'Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}</p>
                ${file ? `<p><strong>Anexo:</strong> O lead enviou uma fatura (${file.originalname})</p>` : '<p><strong>Sem anexo.</strong></p>'}
            `,
        };

        // Se houver arquivo, anexa ao e-mail
        if (file) {
            mailOptions.attachments = [
                {
                    filename: file.originalname,
                    content: file.buffer,
                },
            ];
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('[EmailService] E-mail enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('[EmailService] Erro ao enviar e-mail:', error.message);
        // Não lançamos o erro para não travar a criação do lead no Pipedrive se o e-mail falhar
        return null;
    }
};
