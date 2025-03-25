import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing records
  await prisma.complexity.deleteMany({})

  // Create complexity stages
  const complexities = [
    { name: 'Basic', stage: 1 },
    { name: 'Intermediate', stage: 2 }, 
    { name: 'Advanced', stage: 3 },
    { name: 'Expert', stage: 4 }
  ]

  for (const complexity of complexities) {
    await prisma.complexity.create({
      data: complexity
    })
  }

  console.log('Seeded complexity stages')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
