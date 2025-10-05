import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

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
