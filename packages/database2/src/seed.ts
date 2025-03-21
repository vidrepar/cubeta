import { prisma } from "./client";

import type { User } from "../generated/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
] as Array<Partial<User>>;

const DEFAULT_POSTS = [
  {
    id: "post1",
    title: "Hello World",
    content: "This is my first post",
    authorEmail: "tim@apple.com",
  },
  {
    id: "post2",
    title: "Getting Started",
    content: "Welcome to the platform",
    authorEmail: "tim@apple.com",
  },
] as Array<{ id: string; title: string; content: string; authorEmail: string }>;

(async () => {
  try {
    // Create users first
    const users = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );

    // Then create posts
    await Promise.all(
      DEFAULT_POSTS.map((post) =>
        prisma.post.upsert({
          where: {
            id: post.id,
          },
          update: {
            title: post.title,
            content: post.content,
          },
          create: {
            id: post.id,
            title: post.title,
            content: post.content,
            author: {
              connect: {
                email: post.authorEmail,
              },
            },
          },
        })
      )
    );

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
