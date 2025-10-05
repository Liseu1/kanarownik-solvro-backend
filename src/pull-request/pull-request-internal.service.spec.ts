import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";
import { PullRequestInternalService } from "./pull-request-internal.service";

describe("PullRequestService", () => {
  let service: PullRequestInternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [PullRequestInternalService],
    }).compile();

    service = module.get<PullRequestInternalService>(
      PullRequestInternalService,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
