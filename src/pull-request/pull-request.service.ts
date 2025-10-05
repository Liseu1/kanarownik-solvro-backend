import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { DatabaseService } from "../database/database.service";
import { GetPullRequestDto } from "./dto/get-pull-request.dto";

@Injectable()
export class PullRequestService {
  constructor(protected database: DatabaseService) {}

  async findAll() {
    const pullRequests = await this.database.pullRequest.findMany({
      include: {
        task: true,
        assignee: {
          include: { assignedReviewer: { select: { username: true } } },
        },
        createdBy: {
          include: { assignedReviewer: { select: { username: true } } },
        },
        reviewer: {
          include: { assignedReviewer: { select: { username: true } } },
        },
      },
    });

    const completePullRequests: GetPullRequestDto[] = pullRequests.map(
      (pullRequest) => {
        const assigneeReviewerUsername: string | null =
          pullRequest.assignee?.assignedReviewer?.username ?? null;
        const createdByReviewerUsername: string | null =
          pullRequest.createdBy.assignedReviewer?.username ?? null;
        const reviewerReviewerUsername: string | null =
          pullRequest.reviewer?.assignedReviewer?.username ?? null;

        return {
          id: pullRequest.id,
          task: pullRequest.task,
          assignee:
            pullRequest.assignee === null
              ? null
              : {
                  githubId: pullRequest.assignee.githubId,
                  assignedReviewerId: pullRequest.assignee.assignedReviewerId,
                  assignedReviewerUsername: assigneeReviewerUsername,
                  username: pullRequest.assignee.username,
                  name: pullRequest.assignee.name,
                  lastName: pullRequest.assignee.lastName,
                  isActive: pullRequest.assignee.isActive,
                  role: pullRequest.assignee.role,
                },
          createdBy: {
            githubId: pullRequest.createdBy.githubId,
            assignedReviewerId: pullRequest.createdBy.assignedReviewerId,
            assignedReviewerUsername: createdByReviewerUsername,
            username: pullRequest.createdBy.username,
            name: pullRequest.createdBy.name,
            lastName: pullRequest.createdBy.lastName,
            isActive: pullRequest.createdBy.isActive,
            role: pullRequest.createdBy.role,
          },
          reviewer:
            pullRequest.reviewer === null
              ? null
              : {
                  githubId: pullRequest.reviewer.githubId,
                  assignedReviewerId: pullRequest.reviewer.assignedReviewerId,
                  assignedReviewerUsername: reviewerReviewerUsername,
                  username: pullRequest.reviewer.username,
                  name: pullRequest.reviewer.name,
                  lastName: pullRequest.reviewer.lastName,
                  isActive: pullRequest.reviewer.isActive,
                  role: pullRequest.reviewer.role,
                },
          githubCreatedAt: pullRequest.githubCreatedAt,
          githubUpdatedAt: pullRequest.githubUpdatedAt,
          githubMergedAt: pullRequest.githubMergedAt,
          status: pullRequest.status,
        };
      },
    );
    return completePullRequests;
  }

  async findOne(id: number) {
    try {
      const pullRequest = await this.database.pullRequest.findUnique({
        where: { id },
        include: {
          task: true,
          assignee: {
            include: { assignedReviewer: { select: { username: true } } },
          },
          createdBy: {
            include: { assignedReviewer: { select: { username: true } } },
          },
          reviewer: {
            include: { assignedReviewer: { select: { username: true } } },
          },
        },
      });

      if (pullRequest === null) {
        throw new NotFoundException(
          "Pull request with a given id does not exist",
        );
      }

      const assigneeReviewerUsername: string | null =
        pullRequest.assignee?.assignedReviewer?.username ?? null;
      const createdByReviewerUsername: string | null =
        pullRequest.createdBy.assignedReviewer?.username ?? null;
      const reviewerReviewerUsername: string | null =
        pullRequest.reviewer?.assignedReviewer?.username ?? null;

      const completePullRequest: GetPullRequestDto = {
        id: pullRequest.id,
        task: pullRequest.task,
        assignee:
          pullRequest.assignee === null
            ? null
            : {
                githubId: pullRequest.assignee.githubId,
                assignedReviewerId: pullRequest.assignee.assignedReviewerId,
                assignedReviewerUsername: assigneeReviewerUsername,
                username: pullRequest.assignee.username,
                name: pullRequest.assignee.name,
                lastName: pullRequest.assignee.lastName,
                isActive: pullRequest.assignee.isActive,
                role: pullRequest.assignee.role,
              },
        createdBy: {
          githubId: pullRequest.createdBy.githubId,
          assignedReviewerId: pullRequest.createdBy.assignedReviewerId,
          assignedReviewerUsername: createdByReviewerUsername,
          username: pullRequest.createdBy.username,
          name: pullRequest.createdBy.name,
          lastName: pullRequest.createdBy.lastName,
          isActive: pullRequest.createdBy.isActive,
          role: pullRequest.createdBy.role,
        },
        reviewer:
          pullRequest.reviewer === null
            ? null
            : {
                githubId: pullRequest.reviewer.githubId,
                assignedReviewerId: pullRequest.reviewer.assignedReviewerId,
                assignedReviewerUsername: reviewerReviewerUsername,
                username: pullRequest.reviewer.username,
                name: pullRequest.reviewer.name,
                lastName: pullRequest.reviewer.lastName,
                isActive: pullRequest.reviewer.isActive,
                role: pullRequest.reviewer.role,
              },
        githubCreatedAt: pullRequest.githubCreatedAt,
        githubUpdatedAt: pullRequest.githubUpdatedAt,
        githubMergedAt: pullRequest.githubMergedAt,
        status: pullRequest.status,
      };
      return completePullRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        "Pull request has not been created",
      );
    }
  }
}
