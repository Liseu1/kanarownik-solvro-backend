/*
  Warnings:

  - You are about to drop the `_PullRequestReviewers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_PullRequestReviewers" DROP CONSTRAINT "_PullRequestReviewers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PullRequestReviewers" DROP CONSTRAINT "_PullRequestReviewers_B_fkey";

-- AlterTable
ALTER TABLE "public"."PullRequest" ADD COLUMN     "reviewerId" INTEGER;

-- DropTable
DROP TABLE "public"."_PullRequestReviewers";

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "public"."User"("githubId") ON DELETE SET NULL ON UPDATE CASCADE;
