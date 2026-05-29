import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { createCategorySchema, updateCategorySchema } from '../schemas/financial.schema';

const categoryService = new CategoryService();

export class CategoryController {
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.listAll();
            res.json(categories);
        } catch (error) { next(error); }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // Validação do Zod ocorre antes de chegar na lógica
            const validData = createCategorySchema.parse(req.body);
            const newCategory = await categoryService.create(validData);
            res.status(201).json(newCategory);
        } catch (error) { next(error); }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const validData = updateCategorySchema.parse(req.body);
            const updated = await categoryService.update(id, validData);
            res.json(updated);
        } catch (error) { next(error); }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await categoryService.delete(id);
            res.status(204).send();
        } catch (error: any) {
            // Captura erros específicos lançados pela Service
            if (error.message === 'NOT_FOUND') {
                return res.status(404).json({ error: "Categoria não encontrada" });
            }
            if (error.message === 'DEFAULT_CATEGORY_RESTRICTION') {
                return res.status(400).json({ error: "Categorias padrão não podem ser excluídas" });
            }
            next(error);
        }
    }
}