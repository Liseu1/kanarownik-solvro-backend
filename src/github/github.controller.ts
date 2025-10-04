import { Controller, Get } from "@nestjs/common";

import { PRFetcherService } from "./pr-fetcher";

@Controller("github")
export class GithubController {
  constructor(private readonly PRfetcher: PRFetcherService) {}

  @Get("prs")
  async getAllPRs() {
    return this.PRfetcher.getAllPRs();
  }
}
