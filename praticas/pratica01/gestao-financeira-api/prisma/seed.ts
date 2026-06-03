import { PrismaClient } from '@prisma/client';

// Construtor limpo e compatível com Prisma 5
const prisma = new PrismaClient();

async function main() {
  const defaultCategories = [
    { name: 'income', displayName: 'Receitas', icon: 'trending-up', background: '#2ecc71', isIncome: true, isDefault: true },
    { name: 'food', displayName: 'Alimentação', icon: 'restaurant', background: '#e67e22', isIncome: false, isDefault: true },
    { name: 'transport', displayName: 'Transporte', icon: 'car', background: '#3498db', isIncome: false, isDefault: true },
    { name: 'utilities', displayName: 'Contas Fixas', icon: 'document-text', background: '#9b59b6', isIncome: false, isDefault: true },
    { name: 'leisure', displayName: 'Lazer', icon: 'game-controller', background: '#e74c3c', isIncome: false, isDefault: true },
  ];

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log('Seed executado: 5 categorias padrão registradas.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });