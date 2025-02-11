import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Delete all records in reverse order of dependencies
    console.log('🗑️  Cleaning up database...');
    
    await prisma.message.deleteMany();
    console.log('✓ Deleted all messages');
    
    await prisma.column.deleteMany();
    console.log('✓ Deleted all columns');
    
    await prisma.channel.deleteMany();
    console.log('✓ Deleted all channels');
    
    await prisma.server.deleteMany();
    console.log('✓ Deleted all servers');

    console.log('✨ Database reset complete!');
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
