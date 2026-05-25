# 🏦 BLACKBANK - Banco Digital

Um banco digital moderno, seguro e totalmente funcional criado com Node.js, Next.js e PostgreSQL.

## 🎯 Características

✅ Sistema de autenticação com JWT
✅ Contas bancárias com saldo
✅ Transferências PIX entre usuários
✅ Transferências entre contas bancárias
✅ Histórico de transações
✅ Painel administrativo
✅ Dashboard premium com tema neon
✅ Segurança avançada

## 🛠 Tecnologias

**Backend:**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- bcryptjs para criptografia

**Frontend:**
- Next.js
- React
- TailwindCSS
- Framer Motion

**Hospedagem:**
- Railway (backend e banco de dados)
- Vercel (frontend)

## 📁 Estrutura do Projeto

```
-LOJINHA-PAT-pagbank/
├── backend/                 # API REST
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares
│   ├── prisma/            # Schema do banco
│   ├── server.js          # Servidor principal
│   ├── package.json
│   └── .env.example
├── frontend/               # Aplicação Next.js
│   ├── pages/             # Páginas do app
│   ├── styles/            # CSS global
│   ├── package.json
│   └── .env.local.example
└── README.md
```

## 🚀 Como Começar

### Backend

1. **Instalar dependências:**
```bash
cd backend
npm install
```

2. **Configurar banco de dados:**
```bash
cp .env.example .env
# Editar .env com suas credenciais PostgreSQL
```

3. **Executar migrações:**
```bash
npx prisma migrate dev
```

4. **Iniciar servidor:**
```bash
npm run dev
```

### Frontend

1. **Instalar dependências:**
```bash
cd frontend
npm install
```

2. **Configurar variáveis:**
```bash
cp .env.local.example .env.local
```

3. **Iniciar em desenvolvimento:**
```bash
npm run dev
```

## 📚 Endpoints da API

### Autenticação
- `POST /api/auth/registro` - Criar nova conta
- `POST /api/auth/login` - Fazer login

### Contas
- `GET /api/contas/saldo` - Ver saldo
- `GET /api/contas/dados` - Ver dados da conta
- `PUT /api/contas/atualizar` - Atualizar dados

### Transações
- `POST /api/transacoes/pix` - Enviar PIX
- `POST /api/transacoes/transferencia` - Transferência bancária
- `GET /api/transacoes/historico` - Ver histórico

### Admin
- `GET /api/admin/usuarios` - Listar usuários
- `GET /api/admin/transacoes` - Listar transações
- `POST /api/admin/adicionar-saldo` - Adicionar saldo
- `POST /api/admin/remover-saldo` - Remover saldo

## 🔐 Segurança

- Senhas criptografadas com bcryptjs
- Autenticação via JWT
- Validação de dados
- Proteção contra transações fraudulentas
- Logs de acesso

## 📖 Exemplos de Uso

### Registro
```javascript
POST /api/auth/registro
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "cpf": "12345678900",
  "telefone": "(11) 99999-9999"
}
```

### Enviar PIX
```javascript
POST /api/transacoes/pix
Authorization: Bearer TOKEN
{
  "pixDestino": "chave@blackbank",
  "valor": 50.00,
  "descricao": "Pagamento"
}
```

## 🌐 Deploy no Railway

1. Conecte seu repositório GitHub ao Railway
2. Crie uma variável de ambiente `DATABASE_URL` com a string de conexão PostgreSQL
3. Defina `JWT_SECRET` com uma chave segura
4. Deploy automático a cada push

## 📝 Licença

MIT

## 🤝 Contribuindo

Sinta-se livre para enviar pull requests e reportar issues!

---

**Desenvolvido com ❤️ para o BLACKBANK**
