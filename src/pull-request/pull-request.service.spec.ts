import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";
import { PullRequestService } from "./pull-request.service";

describe("PullRequestService", () => {
  let service: PullRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [PullRequestService],
    }).compile();

    service = module.get<PullRequestService>(PullRequestService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
