import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

import { PullRequestInternalService } from "./pull-request-internal.service";
import { PullRequestController } from "./pull-request.controller";
import { PullRequestService } from "./pull-request.service";

@Module({
  imports: [DatabaseModule],
  controllers: [PullRequestController],
  providers: [PullRequestService, PullRequestInternalService],
  exports: [PullRequestInternalService],
})
export class PullRequestModule {}
