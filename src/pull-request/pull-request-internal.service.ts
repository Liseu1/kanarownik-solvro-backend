import { Prisma } from "@prisma/client";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { CreatePullRequestDto } from "./dto/create-pull-request.dto";
import { UpdatePullRequestDto } from "./dto/update-pull-request.dto";
import { PullRequestService } from "./pull-request.service";

@Injectable()
export class PullRequestInternalService extends PullRequestService {
  async create(createPullRequestDto: CreatePullRequestDto) {
    try {
      const pullRequest = await this.database.pullRequest.create({
        data: {
          id: createPullRequestDto.id,
          taskId: createPullRequestDto.taskId,
          assigneeId: createPullRequestDto.assigneeId,
          createdById: createPullRequestDto.createdById,
          reviewerId: createPullRequestDto.reviewerId,
          githubCreatedAt: createPullRequestDto.githubCreatedAt,
          githubUpdatedAt: createPullRequestDto.githubUpdatedAt,
          githubMergedAt: createPullRequestDto.githubMergedAt,
          status: createPullRequestDto.status,
        },
      });

      return pullRequest;
    } catch (error: unknown) {
      const databaseError = error as Prisma.PrismaClientKnownRequestError;
      switch (databaseError.code) {
        case "P2002": {
          throw new ConflictException(
            "Pull request with such id may already exist.",
          );
        }
        case "P2003": {
          throw new BadRequestException(
            "User(s) with a given id cannot be assigned.",
          );
        }
      }
      throw new InternalServerErrorException("Failed to create a user.");
    }
  }

  async update(id: number, updatePullRequestDto: UpdatePullRequestDto) {
    return this.database.pullRequest.update({
      where: { id },
      data: {
        taskId: updatePullRequestDto.taskId,
        assigneeId: updatePullRequestDto.assigneeId,
        reviewerId: updatePullRequestDto.reviewerId,
        githubUpdatedAt: updatePullRequestDto.githubUpdatedAt,
        status: updatePullRequestDto.status,
      },
    });
  }

  async findLatest() {
    return this.database.pullRequest.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async createMany(createPullRequestDto: CreatePullRequestDto[]) {
    return this.database.pullRequest.createMany({
      data: createPullRequestDto,
    });
  }
}
