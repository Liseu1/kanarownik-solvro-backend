import { Module } from "@nestjs/common";

import { GithubController } from "./github.controller";
import { PRFetcherService } from "./pr-fetcher";

@Module({
  controllers: [GithubController],
  providers: [PRFetcherService],
})
export class GithubModule {}
