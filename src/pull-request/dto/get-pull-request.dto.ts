import type { PullRequestStatus } from "@prisma/client";
import type { GetTaskDto } from "src/task/dto/get-task.dto";
import type { GetUserDto } from "src/user/dto/get-user.dto";

export class GetPullRequestDto {
  id: number;
  task: GetTaskDto;
  assignee: GetUserDto;
  createdBy: GetUserDto;
  reviewer: GetUserDto;
  githubCreatedAt: Date;
  githubUpdatedAt: Date;
  githubMergedAt: Date;
  status: PullRequestStatus;
}
