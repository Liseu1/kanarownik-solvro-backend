import type { PullRequestStatus } from "@prisma/client";
import type { GetTaskDto } from "src/task/dto/get-task.dto";
import type { GetUserDto } from "src/user/dto/get-user.dto";

export class GetPullRequestDto {
  id: bigint;
  task: GetTaskDto;
  assignee: GetUserDto | null;
  createdBy: GetUserDto;
  reviewer: GetUserDto | null;
  githubCreatedAt: Date;
  githubUpdatedAt: Date;
  githubMergedAt: Date | null;
  status: PullRequestStatus;
}
