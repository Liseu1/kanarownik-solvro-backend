import { PrismaClient, PullRequestStatus, UserRole } from "@prisma/client";
import { CreatePullRequestDto } from "src/pull-request/dto/create-pull-request.dto";
import { UpdatePullRequestDto } from "src/pull-request/dto/update-pull-request.dto";

import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { GithubPullRequest } from "./github-pull-request.interface";

@Injectable()
export class PRFetcherService {
  @Cron(CronExpression.EVERY_10_MINUTES)
  async getAllPRs() {
    const github_token = process.env.GITHUB_PERSONAL_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    if (owner === undefined || repo === undefined) {
      throw new Error("define reposity in .env");
    }
    console.warn(`https://api.github.com/repos/${owner}/${repo}/pulls`);
    let page = 1;
    const perPage = "100";
    let allPRs: GithubPullRequest[] = [];
    let hasMore = true;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (github_token != null && github_token !== "") {
      headers.Authorization = `Bearer ${github_token}`;
    }

    while (hasMore) {
      const url = new URL(
        `https://api.github.com/repos/${owner}/${repo}/pulls`,
      );
      url.searchParams.set("page", page.toString());
      url.searchParams.set("per_page", perPage);
      url.searchParams.set("state", "all");

      const response = await fetch(url.toString(), { headers });

      if (!response.ok) {
        throw new Error(`Github API error: ${response.statusText}`);
      }

      const PRs = (await response.json()) as GithubPullRequest[];
      allPRs = [...allPRs, ...PRs];

      if (PRs.length < Number.parseInt(perPage)) {
        hasMore = false;
      }

      page++;
    }

    const createDtos: CreatePullRequestDto[] = [];
    const updateDtos: UpdatePullRequestDto[] = [];
    const prisma = new PrismaClient();
    const latest = await prisma.pullRequest.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
      },
    });
    const assignees = await prisma.user.findMany({
      select: {
        githubId: true,
      },
      where: {
        role: UserRole.PARTICIPANT,
      },
    });

    const reviewers = await prisma.user.findMany({
      select: {
        githubId: true,
      },
      where: {
        role: UserRole.REVIEWER,
      },
    });
    for (const pr of allPRs) {
      if (latest === null || new Date(pr.updated_at) > latest.updatedAt) {
        const taskId = Number(pr.title.split(" ")[1]);
        if (!tasks.some((t) => t.id === taskId)) {
          // if task id doesnt exist in db
          console.warn(
            `${String(pr.id)} has an invalid task id of ${String(taskId)}`,
          );
          continue;
        }

        const assigneeId = pr.assignees[0]?.id;
        if (
          assigneeId != null &&
          !assignees.some((a) => Number(a.githubId) === assigneeId)
        ) {
          console.warn(`${String(pr.id)} has an unregistered assignee`);
          continue;
        }
        if (pr.assignees.length === 0) {
          console.warn(`${String(pr.id)} is missing an assignee`);
        }

        const reviewerId = pr.requested_reviewers[0]?.id;
        if (
          reviewerId != null &&
          !reviewers.some((r) => Number(r.githubId) === reviewerId)
        ) {
          console.warn(`${String(pr.id)} has a unregistered reviewer`);
          continue;
        }
        if (pr.requested_reviewers.length === 0) {
          console.warn(`${String(pr.id)} is missing a reviewer`);
        }

        if (pr.merged_at !== null) {
          pr.state = PullRequestStatus.MERGED;
        }

        if (latest === null || new Date(pr.created_at) > latest.updatedAt) {
          // if pr is created after last scan
          const dto: CreatePullRequestDto = {
            id: pr.id,
            taskId,
            createdById: pr.user.id,
            githubCreatedAt: new Date(pr.created_at),
            githubUpdatedAt: new Date(pr.updated_at),
            githubMergedAt:
              pr.merged_at === null ? undefined : new Date(pr.merged_at),
            assigneeId,
            status: this.mapGitHubStateToPrisma(pr.state),
            reviewerId: pr.requested_reviewers[0]?.id,
          };
          createDtos.push(dto);
        } else if (new Date(pr.updated_at) > latest.updatedAt) {
          // if pr is updated after last scan
          const dto: UpdatePullRequestDto = {
            id: pr.id,
            taskId,
            assigneeId,
            reviewerId: pr.requested_reviewers[0]?.id,
            githubCreatedAt: new Date(pr.created_at),
            githubUpdatedAt: new Date(pr.updated_at),
            githubMergedAt:
              pr.merged_at === null ? undefined : new Date(pr.merged_at),
            status: this.mapGitHubStateToPrisma(pr.state),
          };
          updateDtos.push(dto);
        }
      }
    }
    await prisma.pullRequest.createMany({
      data: createDtos,
    });
    for (const dto of updateDtos) {
      await prisma.pullRequest.update({
        where: { id: dto.id },
        data: {
          taskId: dto.taskId,
          assigneeId: dto.assigneeId,
          reviewerId: dto.reviewerId,
          githubUpdatedAt: dto.githubUpdatedAt,
          status: dto.status,
        },
      });
    }
  }

  mapGitHubStateToPrisma(state: string): PullRequestStatus {
    // not the best solution but I cant think of any other than changing enum and thats also bad
    switch (state.toLowerCase()) {
      case "open": {
        return PullRequestStatus.OPEN;
      }
      case "closed": {
        return PullRequestStatus.CLOSED;
      }
      case "merged": {
        return PullRequestStatus.MERGED;
      }
      default: {
        throw new Error(`Unknown PR state: ${state}`);
      }
    }
  }
}
