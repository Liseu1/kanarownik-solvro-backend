import type { PullRequestStatus } from "@prisma/client";

export class CreatePullRequestDto {
  id: bigint;
  taskId: number;
  assigneeId: bigint | null; // github id
  createdById: bigint; // github id
  reviewerId: bigint | null; // github id
  githubCreatedAt: Date;
  githubUpdatedAt: Date;
  githubMergedAt?: Date | null;
  status: PullRequestStatus;
}
