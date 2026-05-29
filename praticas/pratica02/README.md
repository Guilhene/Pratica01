# Gestão Financeira API 

Backend modular desenvolvido em Node.js com TypeScript, Express, Prisma ORM, PostgreSQL e validação de dados estrita com Zod.

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (v18+)
* Banco de Dados PostgreSQL rodando na porta `5432`

### Passo a Passo
1. **Instale as dependências:**
   ```bash
   npm install

2. **Sincronize o banco de dados (Criação das tabelas):**
   ```bash
   npx prisma db push

3. **Popule o banco com as 5 categorias fixas padrão:**
   ```bash
   npx prisma db seed

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev