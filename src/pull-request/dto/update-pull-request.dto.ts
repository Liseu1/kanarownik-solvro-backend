import type { PullRequestStatus } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";

import { CreatePullRequestDto } from "./create-pull-request.dto";

export class UpdatePullRequestDto extends PartialType(CreatePullRequestDto) {
  taskId: number;
  assigneeId?: number; // github id
  reviewers?: number[]; // github ids
  githubUpdatedAt?: Date;
  githubMergedAt?: Date;
  status?: PullRequestStatus;
}
