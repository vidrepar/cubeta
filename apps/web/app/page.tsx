import * as db1 from "@repo/database";
import * as db2 from "@repo/database2";
import prisma from "../lib/prisma";

export default async function IndexPage() {
  const users = await db1.prisma.user.findMany();
  const users2 = await db2.prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  const complexities = await prisma.complexity.findMany();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          users2.map((user) => ({
            ...user,
            posts: user.posts.map((post) => ({
              ...post,
              author: undefined,
            })),
          })),
          null,
          2
        )}
      </pre>
      <pre>{JSON.stringify(complexities, null, 2)}</pre>
    </div>
  );
}
