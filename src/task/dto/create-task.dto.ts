export class CreateTaskDto {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
}
