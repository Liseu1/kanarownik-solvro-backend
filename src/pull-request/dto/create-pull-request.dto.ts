import type { PullRequestStatus } from "@prisma/client";

export class CreatePullRequestDto {
  id: number;
  taskId: number;
  assigneeId?: number; // github id
  createdById: number; // github id
  reviewerId?: number; // github id
  githubCreatedAt: Date;
  githubUpdatedAt: Date;
  githubMergedAt?: Date;
  status: PullRequestStatus;
}
