import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.userRole.upsert({
    where: { role_name: 'admin' },
    update: {},
    create: {
      role_name: 'admin',
      description: 'Administrator role with full access.',
    },
  });
  const regularUser = await prisma.userRole.upsert({
    where: { role_name: 'user' },
    update: {},
    create: {
      role_name: 'user',
      description:
        'User with access to manage short urls and entities associated with short urls.',
    },
  });
  const subhan = await prisma.user.upsert({
    where: { email: 'muhammadsubhan5701@gmail.com' },
    update: {
      email: 'muhammadsubhan5701@gmail.com',
      username: 'muhammadsubhan5701',
      password_hash: await bcrypt.hash('Subhan123', 10),
      role_id: 1,
    },
    create: {
      email: 'muhammadsubhan5701@gmail.com',
      username: 'muhammadsubhan5701',
      password_hash: await bcrypt.hash('Subhan123', 10),
      role_id: 1,
    },
  });
  const hoco = await prisma.user.upsert({
    where: { email: 'hoco1092@gmail.com' },
    update: {
      email: 'hoco1092@gmail.com',
      username: 'hoco1092',
      password_hash: await bcrypt.hash('Subhan123', 10),
      role_id: 2,
    },
    create: {
      email: 'hoco1092@gmail.com',
      username: 'hoco1092',
      password_hash: await bcrypt.hash('Subhan123', 10),
      role_id: 2,
    },
  });
  console.log({ admin, regularUser, subhan, hoco });
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
