/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."PullRequest" DROP CONSTRAINT "PullRequest_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PullRequest" DROP CONSTRAINT "PullRequest_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."PullRequest" DROP CONSTRAINT "PullRequest_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_assignedReviewerId_fkey";

-- AlterTable
ALTER TABLE "public"."PullRequest" ALTER COLUMN "assigneeId" SET DATA TYPE BIGINT,
ALTER COLUMN "createdById" SET DATA TYPE BIGINT,
ALTER COLUMN "reviewerId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "githubId" SET DATA TYPE BIGINT,
ALTER COLUMN "assignedReviewerId" SET DATA TYPE BIGINT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("githubId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_assignedReviewerId_fkey" FOREIGN KEY ("assignedReviewerId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
