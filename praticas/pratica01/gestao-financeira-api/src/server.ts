import express, { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes); // Injeta as rotas modulares

// Middleware Global de tratamento de erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Se for erro de validação do Zod, responde conforme o contrato
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Dados inválidos",
      details: err.flatten().fieldErrors
    });
  }
  
  console.error(err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend modular rodando em http://localhost:${PORT}`);
});