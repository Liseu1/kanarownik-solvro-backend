-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "dueDate" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Task_id_seq";
