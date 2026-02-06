import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Clear existing tasks
  await prisma.task.deleteMany();

  console.log('Seeding database...');

  const tasks = await prisma.task.createMany({
    data: [
      {
        id: uuidv4(),
        title: 'Setup project repository',
        description: 'Initialize git repository and set up folder structure',
        status: 'COMPLETED',
      },
      {
        id: uuidv4(),
        title: 'Design database schema',
        description: 'Create Entity-Relationship diagram and Prisma schema',
        status: 'COMPLETED',
      },
      {
        id: uuidv4(),
        title: 'Implement backend API',
        description: 'Create Express.js server with CRUD endpoints',
        status: 'IN_PROGRESS',
      },
      {
        id: uuidv4(),
        title: 'Build React frontend',
        description: 'Create responsive UI components and pages',
        status: 'TODO',
      },
      {
        id: uuidv4(),
        title: 'Add authentication',
        description: 'Implement JWT-based authentication',
        status: 'TODO',
      },
      {
        id: uuidv4(),
        title: 'Deploy application',
        description: 'Deploy to production environment',
        status: 'TODO',
      },
    ],
  });

  console.log(`✓ Seeded ${tasks.count} tasks`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
