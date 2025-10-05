import { Injectable } from "@nestjs/common";

import { TaskService } from "./task.service";

@Injectable()
export class TaskInternalService extends TaskService {
  async findAllIds() {
    return this.database.task.findMany({
      select: {
        id: true,
      },
    });
  }
}
