import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()

//example of queries using Prisma
async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })