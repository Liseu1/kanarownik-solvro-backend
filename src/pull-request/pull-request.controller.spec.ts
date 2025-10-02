import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { PullRequestController } from "./pull-request.controller";
import { PullRequestService } from "./pull-request.service";

describe("PullRequestController", () => {
  let controller: PullRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PullRequestController],
      providers: [PullRequestService],
    }).compile();

    controller = module.get<PullRequestController>(PullRequestController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
