export class GetTaskDto {
  id: number;
  title: string;
  description: string | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
