# Projeto de Gestão Financeira 📱💰

Este é um projeto full-stack de gestão financeira pessoal, composto por um aplicativo mobile (React Native/Expo) e uma API REST (Node.js/Express).

---

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (ou um container Docker com Postgres)
- [Expo Go](https://expo.dev/go) (instalado no seu celular para testar o app)

---

## 🚀 Como Rodar o Projeto

### 1. Configurar o Backend (API)

1. Entre na pasta do servidor:
   ```bash
   cd gestao-financeira-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados:
   - Crie um arquivo `.env` baseado no seu acesso ao Postgres. Exemplo:
     ```env
     DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/gestao_financeira?schema=public"
     ```
4. Execute as migrações do Prisma e o Seed (dados iniciais):
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```
   A API estará rodando em `http://localhost:3000`.

### 2. Configurar o Frontend (App Mobile)

1. Volte para a raiz do projeto e entre na pasta do app (se estiver separado):
   ```bash
   npm install
   ```
2. **Configuração de IP (Importante para Celular Físico):**
   - Abra o arquivo `util/http.js`.
   - Altere o `BACKEND_URL` para o endereço IP local da sua máquina. Exemplo:
     ```javascript
     const BACKEND_URL = 'http://192.168.x.x:3000';
     ```
3. Inicie o Expo:
   ```bash
   npx expo start
   ```
4. Escaneie o QR Code com o aplicativo **Expo Go** no seu celular.

---

## 📑 Documentação da API (Endpoints)

### Categorias (`/categories`)
- `GET /categories`: Lista todas as categorias.
- `POST /categories`: Cria uma nova categoria.
  - *Corpo:* `{ "name": "slug", "displayName": "Nome", "icon": "ícone", "background": "#hex", "isIncome": false }`
- `PUT /categories/:id`: Atualiza uma categoria.
- `DELETE /categories/:id`: Remove uma categoria (exceto as padrão).

### Transações (`/transactions`)
- `GET /transactions`: Lista todas as transações.
- `POST /transactions`: Registra uma nova despesa/receita.
  - *Corpo:* `{ "description": "...", "value": 10.5, "date": "ISOString", "categoryId": "UUID" }`
- `PUT /transactions/:id`: Atualiza uma transação existente.
- `DELETE /transactions/:id`: Remove uma transação.

---

## ✨ Funcionalidades do App
- **Resumo Visual:** Gráfico de pizza por categoria.
- **Filtros:** Visualize gastos por Tudo, Mês Atual ou Ano Atual na tela de Resumo.
- **Gestão de Categorias:** Adicione categorias personalizadas diretamente pela tela de cadastro.
- **Histórico:** Visualize transações recentes (últimos 7 dias) e o histórico completo.

---

## 🧰 Tecnologias Utilizadas
- **Frontend:** React Native, Expo, Axios, React Native Chart Kit.
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL, Zod (Validação).
