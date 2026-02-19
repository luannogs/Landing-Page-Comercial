require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const leadsRouter = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rotas da API ─────────────────────────────────────────────────────────────
app.use('/api/leads', leadsRouter);

// ── Serve o frontend em produção (Heroku) ────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
    );
}

// ── Inicialização ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT} [${process.env.NODE_ENV}]`);
});
