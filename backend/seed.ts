import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

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

  const generateFakeUrlClicks = (num: number, urlIds: string[]) => {
    return Array.from({ length: num }, () => {
      const country = faker.location.country();
      const city = faker.location.city();
      const referrer = faker.datatype.boolean() ? faker.internet.url() : null;

      return {
        url_id: faker.helpers.arrayElement(urlIds),
        access_date: faker.date.past(), // Generates a valid DateTime object
        access_time: faker.date.recent().toISOString(), // Ensures ISO string format for DateTime
        ip_address: faker.internet.ip().substring(0, 45), // Truncate if necessary
        user_agent: faker.internet.userAgent().substring(0, 255), // Truncate if necessary
        referrer, // Optional, null or valid URL
        country: country.substring(0, 50), // Ensure this fits within VarChar(50)
        city: city.substring(0, 50), // Ensure this fits within VarChar(50)
      };
    });
  };

  const urlRecords = await prisma.url.findMany({
    select: {
      url_id: true,
    },

    where: {
      user_id: '00c72f3f-1a2f-4282-b567-00f72f8230b7',

      OR: [
        {
          expiration_date: null,
        },
        {
          expiration_date: {
            gte: new Date(),
          },
        },
      ],
    },
  });

  const urlIds = urlRecords.map((record) => record.url_id);

  const fakeUrlClicks = generateFakeUrlClicks(500000, urlIds);
  await prisma.urlClick.createMany({
    data: fakeUrlClicks,
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
