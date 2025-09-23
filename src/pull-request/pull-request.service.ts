import { Injectable } from "@nestjs/common";

import { CreatePullRequestDto } from "./dto/create-pull-request.dto";
import { UpdatePullRequestDto } from "./dto/update-pull-request.dto";

@Injectable()
export class PullRequestService {
  create(createPullRequestDto: CreatePullRequestDto) {
    console.warn(createPullRequestDto);
    return "This action adds a new pullRequest";
  }

  findAll() {
    return `This action returns all pullRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id.toString()} pullRequest`;
  }

  update(id: number, updatePullRequestDto: UpdatePullRequestDto) {
    console.warn(updatePullRequestDto);
    return `This action updates a #${id.toString()} pullRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id.toString()} pullRequest`;
  }
}
