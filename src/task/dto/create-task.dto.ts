export class CreateTaskDto {
  id: number;
  dueDate: Date;
  title: string;
  description?: string;
}
