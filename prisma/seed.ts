import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        githubId: 93_681_952,
        username: "Liseu1",
        name: "Jakub",
        lastName: "Lisowski",
        role: UserRole.PARTICIPANT,
        isActive: true,
      },
      {
        githubId: 72_706_877,
        username: "Infor-tech",
        name: "as",
        lastName: "asef",
        role: UserRole.REVIEWER,
        isActive: true,
      },
    ],
  });

  await prisma.task.create({
    data: {
      id: 1,
      title: "task 1",
      description: "description",
      dueDate: new Date("2025-11-11"),
    },
  });

  // await prisma.pullRequest.create({
  //   data: {
  //     id: 15,
  //     taskId: 1,
  //     createdById: 93_681_952,
  //     assigneeId: 93_681_952,
  //     reviewerId: 72_706_877,
  //     githubCreatedAt: new Date(),
  //     githubUpdatedAt: new Date(),
  //     status: PullRequestStatus.OPEN,
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    throw new Error("query failed");
  });
