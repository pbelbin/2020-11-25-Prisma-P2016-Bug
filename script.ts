import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  // Delete existing data
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.group.deleteMany({});
  
  
  // Determine high# for authorID
  const newAuthorID = 1;
  
  
  // Create 2 posts by new user
  await prisma.group.create({
    data: {
      id: 20,
      name: 'Grp1',
      posts: {
        create: [
          {
            title: 'post x-1',
            content: 'Yabba dabba do!',
            author: {
              create: {
                id: newAuthorID,
                email: 'author1@testing.com',
                name: 'Fred Flintstone',
              }
            }
          },
          {
            title: 'post x-1',
            content: 'Yabba dabba do!',
            author: {
              connect: {
                id: newAuthorID,
              }
            }
          }
        ]
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
