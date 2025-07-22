const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "info@ggcleanexperts.com"; // Change to your admin email if needed
  const newPassword = "password"; // Change to your desired password
  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    console.log("No admin found with email:", email);
    return;
  }

  await prisma.admin.update({
    where: { email },
    data: { password: hashedPassword },
  });
  console.log("Admin password updated for:", email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
