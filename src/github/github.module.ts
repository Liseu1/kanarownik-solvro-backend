import { Module } from "@nestjs/common";

import { PullRequestModule } from "../pull-request/pull-request.module";
import { TaskModule } from "../task/task.module";
import { UserModule } from "../user/user.module";
import { PRFetcherService } from "./pr-fetcher";

@Module({
  providers: [PRFetcherService],
  imports: [PullRequestModule, TaskModule, UserModule],
})
export class GithubModule {}
