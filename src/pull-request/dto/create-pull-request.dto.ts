export class CreatePullRequestDto {
  id: number;
  taskId: number;
  createdBy: number; // github id
  status: string;
  assignee?: number; // github id
  reviewers?: number[]; // github ids
  createdAt: Date;
  updatedAt?: Date;
  mergedAt?: Date;
}
