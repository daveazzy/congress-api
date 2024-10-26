import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
