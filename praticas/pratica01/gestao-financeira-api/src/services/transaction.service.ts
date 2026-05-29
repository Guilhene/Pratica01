import { prisma } from '../config/database';

export class TransactionService {
  async create(data: any) {
    return prisma.transaction.create({
      data,
      include: { category: true } // Garante o retorno expandido/aninhado
    });
  }

  async listAll() {
    return prisma.transaction.findMany({
      include: { category: true }
    });
  }

  async update(id: string, data: any) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: { category: true }
    });
  }

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  }
}