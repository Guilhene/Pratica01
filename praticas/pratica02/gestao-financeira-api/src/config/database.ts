import { PrismaClient } from '@prisma/client';

// Instância única para ser exportada e usada em toda a aplicação
export const prisma = new PrismaClient();