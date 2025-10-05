import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
