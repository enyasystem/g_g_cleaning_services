import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "info@ggcleanexperts.com";
  const rawPassword = "password"; // Change after first login!
  const bcrypt = require("bcryptjs");
  const password = bcrypt.hashSync(rawPassword, 10);

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists:", existing.email);
    return;
  }

  const admin = await prisma.admin.create({
    data: {
      name: "Admin", // Set a default name
      email,
      password,
    },
  });
  console.log("Admin created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
