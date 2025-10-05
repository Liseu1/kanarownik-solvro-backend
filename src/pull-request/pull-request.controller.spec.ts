import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";
import { PullRequestInternalService } from "./pull-request-internal.service";
import { PullRequestController } from "./pull-request.controller";
import { PullRequestService } from "./pull-request.service";

describe("PullRequestController", () => {
  let controller: PullRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [PullRequestController],
      providers: [PullRequestService, PullRequestInternalService],
    }).compile();

    controller = module.get<PullRequestController>(PullRequestController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
