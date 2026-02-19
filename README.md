# 🚀 Landing Page Comercial

Landing page fullstack com captura de leads integrada ao **Pipedrive**, hospedada no **Heroku**.

---

## 🗂️ Estrutura de Pastas

```
Landing-Page-Comercial/
├── .env.example               # Variáveis de ambiente (copie para .env)
├── .gitignore
├── package.json               # Dependências e scripts do backend
│
├── server/                    # ── BACKEND (Node.js / Express) ──
│   ├── index.js               # Entrada: configura Express e rotas
│   ├── routes/
│   │   └── leads.js           # POST /api/leads
│   ├── controllers/
│   │   └── leadsController.js # Valida payload e chama o serviço
│   └── services/
│       └── pipedriveService.js# Integração com a API do Pipedrive
│
└── client/                    # ── FRONTEND (React + Vite) ──
    ├── index.html
    ├── vite.config.js         # Proxy /api → backend em dev
    ├── package.json
    └── src/
        ├── main.jsx           # Montagem do React
        ├── App.jsx            # Composição das seções
        ├── styles/
        │   └── global.css     # Design tokens, reset, utilitários
        ├── components/
        │   ├── Navbar/        # Header fixo com glassmorphism
        │   ├── Hero/          # Seção principal com CTA
        │   ├── Features/      # Grid de benefícios
        │   ├── LeadForm/      # Formulário → Pipedrive
        │   └── Footer/        # Rodapé
        └── services/
            └── api.js         # Instância Axios centralizada
```

---

## ⚙️ Pré-requisitos

- Node.js ≥ 18
- Conta no [Heroku](https://heroku.com)
- Conta e API Token no [Pipedrive](https://www.pipedrive.com)

---

## 🛠️ Instalação

```bash
# 1. Variáveis de ambiente
cp .env.example .env
# Edite .env com seu token do Pipedrive

# 2. Dependências do backend
npm install

# 3. Dependências do frontend
cd client && npm install && cd ..
```

---

## ▶️ Execução Local

```bash
# Roda backend (porta 5000) + frontend (porta 5173) simultaneamente
npm run dev
```

Acesse **http://localhost:5173**

---

## 🚢 Deploy no Heroku

```bash
heroku create nome-do-seu-app
heroku config:set PIPEDRIVE_API_TOKEN=seu_token
heroku config:set PIPEDRIVE_COMPANY_DOMAIN=sua_empresa
heroku config:set NODE_ENV=production
git push heroku main
```

O script `heroku-postbuild` do `package.json` raiz executa `npm run build` automaticamente,
gerando o bundle do Vite que será servido pelo Express em produção.
