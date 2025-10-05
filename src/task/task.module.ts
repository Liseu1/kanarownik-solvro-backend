import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TaskInternalService } from "./task-internal.service";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, TaskInternalService],
  exports: [TaskInternalService],
})
export class TaskModule {}
