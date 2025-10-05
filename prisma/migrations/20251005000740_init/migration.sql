-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('PARTICIPANT', 'REVIEWER');

-- CreateEnum
CREATE TYPE "public"."PullRequestStatus" AS ENUM ('OPEN', 'CLOSED', 'MERGED');

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "githubId" BIGINT NOT NULL,
    "assignedReviewerId" BIGINT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" "public"."UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("githubId")
);

-- CreateTable
CREATE TABLE "public"."PullRequest" (
    "id" BIGINT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "assigneeId" BIGINT,
    "reviewerId" BIGINT,
    "createdById" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "githubCreatedAt" TIMESTAMP(3) NOT NULL,
    "githubUpdatedAt" TIMESTAMP(3) NOT NULL,
    "githubMergedAt" TIMESTAMP(3),
    "status" "public"."PullRequestStatus" NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_assignedReviewerId_fkey" FOREIGN KEY ("assignedReviewerId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
