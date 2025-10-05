import { Injectable } from "@nestjs/common";

import { CreatePullRequestDto } from "./dto/create-pull-request.dto";
import { PullRequestService } from "./pull-request.service";

@Injectable()
export class PullRequestInternalService extends PullRequestService {
  findLatest() {
    return "This method will return the latest Pull Request";
  }

  createMany(createPullRequestDto: CreatePullRequestDto) {
    console.warn(createPullRequestDto);
    return "This method will create records in a database";
  }
}
