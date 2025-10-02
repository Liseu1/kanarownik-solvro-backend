import type { PullRequestStatus } from "@prisma/client";

export class CreatePullRequestDto {
  id: number;
  taskId: number;
  assigneeId?: number; // github id
  createdById: number; // github id
  reviewers?: number[]; // github ids
  githubCreatedAt: Date;
  githubUpdatedAt?: Date;
  githubMergedAt?: Date;
  status: PullRequestStatus;
}
