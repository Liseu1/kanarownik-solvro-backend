import { Controller, Get, Param } from "@nestjs/common";

import { PullRequestService } from "./pull-request.service";

@Controller("pull-request")
export class PullRequestController {
  constructor(private readonly pullRequestService: PullRequestService) {}

  @Get()
  async findAll() {
    return this.pullRequestService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.pullRequestService.findOne(+id);
  }
}
