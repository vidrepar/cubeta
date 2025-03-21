import { prisma } from "@repo/database";
import * as prisma2 from "@repo/database2";

export default async function IndexPage() {
  const users = await prisma.user.findMany();
  const users2 = await prisma2.prisma.user.findMany({
    include: {
      posts: true,
    },
  });
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
    </div>
  );
}
