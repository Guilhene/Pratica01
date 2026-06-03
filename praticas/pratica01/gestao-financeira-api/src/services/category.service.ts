import { prisma } from '../config/database';

export class CategoryService {
  async listAll() {
    return prisma.category.findMany();
  }

  async create(data: any) {
    return prisma.category.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    
    if (!category) {
      throw new Error('NOT_FOUND');
    }

    // Regra de Negócio centralizada
    if (category.isDefault || category.name === 'income') {
      throw new Error('DEFAULT_CATEGORY_RESTRICTION');
    }

    return prisma.category.delete({ where: { id } });
  }
}