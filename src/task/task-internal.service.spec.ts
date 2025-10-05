import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";
import { TaskInternalService } from "./task-internal.service";

describe("TaskService", () => {
  let service: TaskInternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TaskInternalService],
    }).compile();

    service = module.get<TaskInternalService>(TaskInternalService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
