import { Module } from "@nestjs/common";

import { PullRequestController } from "./pull-request.controller";
import { PullRequestService } from "./pull-request.service";

@Module({
  controllers: [PullRequestController],
  providers: [PullRequestService],
})
export class PullRequestModule {}
