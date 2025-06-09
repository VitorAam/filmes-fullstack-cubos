# 🎬 Filmes Fullstack - Cubos Challenge

Aplicação web **fullstack** para cadastro, edição, visualização e gerenciamento de filmes.  
Inclui:

✅ Autenticação com JWT  
✅ CRUD de filmes  
✅ Busca + filtros  
✅ Tema claro/escuro  
✅ Upload de imagem (Cloudflare R2)  
✅ Envio de e-mail para lançamento de filme (Resend)  
✅ Backend com Prisma/PostgreSQL (Supabase)  
✅ Frontend com React + Vite + Chakra UI  
✅ Estrutura de código escalável com boas práticas

---

## 🗂️ Estrutura do projeto

/filmes-fullstack-cubos
├── back -> API REST com Express, Prisma e PostgreSQL
└── front -> Frontend React com Vite

---

## 🚀 Como rodar o projeto

### 1️⃣ Pré-requisitos

- Node.js 18+
- Yarn ou npm
- PostgreSQL (usei Supabase, recomendado)
- Conta no [Cloudflare R2](https://dash.cloudflare.com/)
- Conta no [Resend](https://resend.com/) para envio de e-mail

---

### 2️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/filmes-fullstack-cubos.git
cd filmes-fullstack-cubos

3️⃣ Configurar o backend (/back)

cd back
yarn install

Variáveis de ambiente

Crie um arquivo .env com o seguinte:

# Banco de dados (exemplo Supabase)
DATABASE_URL=postgresql://usuario:senha@host:porta/database

# JWT
JWT_SECRET=sua_secret_segura

# Cloudflare R2
R2_ACCESS_KEY_ID=sua-access-key
R2_SECRET_ACCESS_KEY=sua-secret-key
R2_ENDPOINT=https://seu-endpoint.r2.cloudflarestorage.com
R2_BUCKET=cubos-tecnologia
R2_PUBLIC_URL=https://cubos-tecnologia.seu-id.r2.dev

# Resend
RESEND_API_KEY=seu-token
RESEND_SENDER_EMAIL=you@yourdomain.com

Rodar migrations

npx prisma generate
npx prisma migrate deploy

Iniciar backend

yarn dev
# ou
npm run dev

Backend rodará em: http://localhost:3333
4️⃣ Configurar o frontend (/front)

cd ../front
yarn install

Variáveis de ambiente

Crie um .env:

VITE_API_URL=http://localhost:3333/api

Rodar frontend

yarn dev
# ou
npm run dev

Frontend: http://localhost:5173
⚙️ Funcionalidades

    Login / Cadastro de usuário (JWT)

    Listagem de filmes paginada + busca + filtros

    Cadastro e edição de filmes

    Upload de imagem para Cloudflare R2

    Envio de e-mail automático no dia de lançamento (Resend)

    Autorização: somente dono do filme pode editar/deletar

    Tema claro/escuro

    Responsivo

📝 Rotas API
🔑 Autenticação
Método	Rota	Descrição
POST	/api/auth/register	Cadastrar usuário
POST	/api/auth/login	Login
🎬 Filmes
Método	Rota	Descrição	Auth
GET	/api/movies	Listar filmes paginados com filtros	✅
GET	/api/movies/:id	Buscar detalhes de filme	✅
POST	/api/movies	Criar novo filme	✅
PATCH	/api/movies/:id	Atualizar filme	✅
DELETE	/api/movies/:id	Deletar filme	✅
🖼️ Upload
Método	Rota	Descrição	Auth
POST	/api/upload	Upload de imagem para R2	✅

🤝 Como testar o projeto completo

1️⃣ Cadastrar usuário (/auth/register)
2️⃣ Fazer login (/auth/login) → salvar token no localStorage
3️⃣ Cadastrar filme → imagem vai para Cloudflare R2
4️⃣ Ver listagem → buscar, filtrar, paginação
5️⃣ Editar / deletar filme (somente se for dono)
6️⃣ No dia do lançamento → e-mail via Resend para o dono
🏗️ Tecnologias usadas
Backend:

    Node.js

    Express

    Prisma ORM

    PostgreSQL (Supabase)

    JWT

    Zod

    Resend (emails)

    Cloudflare R2 (storage)

Frontend:

    React

    Vite

    Chakra UI

    React Hook Form + Zod

    Axios

    React Router DOM

    jwt-decode

🚀 Melhorias futuras

    Testes automatizados (Jest / Vitest)

    Upload com progresso

    Paginação configurável

    UI/UX refinada

    Internacionalização

🙋🏻‍♂️ Autor

Vitor Augusto
Seu GitHub
Seu LinkedIn
✅ Checklist do desafio

✅ Autenticação com login/cadastro
✅ CRUD completo de filmes
✅ Filtros e busca
✅ Tema claro/escuro
✅ Upload imagem (R2)
✅ Envio de e-mail lançamento (Resend)
✅ Código organizado e escalável
✅ Documentação (este README)
```
