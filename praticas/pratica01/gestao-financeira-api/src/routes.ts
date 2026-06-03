import { Router } from 'express';
import { CategoryController } from './controllers/category.controller';
import { TransactionController } from './controllers/transaction.controller';

const routes = Router();
const categoryController = new CategoryController();
const transactionController = new TransactionController();

// --- Health-Check ---
routes.get('/', (req, res) => res.json({ ok: true, name: "gestao-financeira-api" }));

// --- Rotas de Categorias ---
routes.get('/categories', categoryController.list);
routes.post('/categories', categoryController.create);
routes.put('/categories/:id', categoryController.update);
routes.delete('/categories/:id', categoryController.delete);

// --- Rotas de Transações ---
routes.post('/transactions', transactionController.create);
routes.get('/transactions', transactionController.list);
routes.put('/transactions/:id', transactionController.update);
routes.delete('/transactions/:id', transactionController.delete);

export { routes };