import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../src/database/database.module";
import { TaskService } from "./task.service";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
