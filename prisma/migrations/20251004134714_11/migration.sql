/*
  Warnings:

  - The primary key for the `PullRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."PullRequest" DROP CONSTRAINT "PullRequest_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id");
