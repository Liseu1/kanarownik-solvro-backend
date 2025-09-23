import { PartialType } from "@nestjs/mapped-types";

import { CreatePullRequestDto } from "./create-pull-request.dto";

export class UpdatePullRequestDto extends PartialType(CreatePullRequestDto) {
  status?: string;
  assignee?: number;
  reviewers?: number[];
  updatedAt?: Date;
  mergedAt?: Date;
}
