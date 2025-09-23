import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

import { CreatePullRequestDto } from "./dto/create-pull-request.dto";
import { UpdatePullRequestDto } from "./dto/update-pull-request.dto";
import { PullRequestService } from "./pull-request.service";

@Controller("pull-request")
export class PullRequestController {
  constructor(private readonly pullRequestService: PullRequestService) {}

  @Post()
  create(@Body() createPullRequestDto: CreatePullRequestDto) {
    return this.pullRequestService.create(createPullRequestDto);
  }

  @Get()
  findAll() {
    return this.pullRequestService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.pullRequestService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePullRequestDto: UpdatePullRequestDto,
  ) {
    return this.pullRequestService.update(+id, updatePullRequestDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.pullRequestService.remove(+id);
  }
}
