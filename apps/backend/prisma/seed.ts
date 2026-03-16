import { prisma } from '../prisma/db'

async function main() {

  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: [
      {
        name: "Florecita",
        email: "florecita@example.com"
      },
      {
        name: "Wenny",
        email: "wenny@example.com"
      },
      {
        name: "Xaviera",
        email: "xaviera@example.com"
      }
    ]
  })

  console.log("Seed berhasil dijalankan")
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())