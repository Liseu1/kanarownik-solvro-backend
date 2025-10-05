import { PullRequestModule } from "src/pull-request/pull-request.module";
import { TaskModule } from "src/task/task.module";
import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";

import { GithubController } from "./github.controller";
import { PRFetcherService } from "./pr-fetcher";

@Module({
  controllers: [GithubController],
  providers: [PRFetcherService],
  imports: [PullRequestModule, TaskModule, UserModule],
})
export class GithubModule {}
