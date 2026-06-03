import { Request, Response, NextFunction } from 'express';
import { TransactionService } from '../services/transaction.service';
import { createTransactionSchema, updateTransactionSchema } from '../schemas/financial.schema';

const transactionService = new TransactionService();

export class TransactionController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validData = createTransactionSchema.parse(req.body);
            const newTransaction = await transactionService.create(validData);
            res.status(201).json(newTransaction);
        } catch (error) { next(error); }
    }

    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const transactions = await transactionService.listAll();
            res.json(transactions);
        } catch (error) { next(error); }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params as { id?: string | string[] };
            if (Array.isArray(id)) id = id[0];
            if (!id) return res.status(400).json({ error: 'id is required' });
            
            const validData = updateTransactionSchema.parse(req.body);
            const updatedTransaction = await transactionService.update(id, validData);
            res.json(updatedTransaction);
        } catch (error) { next(error); }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params as { id?: string | string[] };
            if (Array.isArray(id)) id = id[0];
            if (!id) return res.status(400).json({ error: 'id is required' });
            await transactionService.delete(id);
            res.status(204).send();
        } catch (error) { next(error); }
    }
}