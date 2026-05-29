import { z } from 'zod';

// Configuração do Zod para criação de categorias
export const createCategorySchema = z.object({
    name: z.string().min(1, { message: "O nome interno (name) é obrigatório" }),
    displayName: z.string().min(1, { message: "O nome de exibição (displayName) é obrigatório" }),
    icon: z.string().min(1, { message: "O ícone é obrigatório" }),
    background: z.string().min(1, { message: "A cor de fundo é obrigatória" }),
    isIncome: z.boolean({ error: "O campo isIncome deve ser true ou false" })
});

// Permite atualização parcial (nenhum campo é estritamente obrigatório no PUT)
export const updateCategorySchema = createCategorySchema.partial();

// Configuração do Zod para transações (Exemplo: barra descrição vazia)
export const createTransactionSchema = z.object({
    description: z.string().min(1, { message: "A descrição não pode estar vazia" }),
    value: z.number({ error: "O valor deve ser um número válido" }),
    // Transforma a string de data enviada pelo Front em um objeto Date do JavaScript
    date: z.string().datetime({ message: "A data deve estar no formato ISO válido" }).transform((val) => new Date(val)),
    categoryId: z.string().uuid({ message: "O categoryId deve ser um UUID válido" })
});

export const updateTransactionSchema = z.object({
    description: z.string().min(1, { message: "A descrição não pode estar vazia" }).optional(),
    value: z.number({ error: "O valor deve ser um número válido" }).optional(),
    date: z.string().datetime({ message: "A data deve estar no formato ISO válido" }).transform((val) => new Date(val)).optional(),
    categoryId: z.string().uuid({ message: "O categoryId deve ser um UUID válido" }).optional()
});
