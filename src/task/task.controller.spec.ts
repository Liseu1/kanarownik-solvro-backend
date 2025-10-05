import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../src/database/database.module";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

describe("TaskController", () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
