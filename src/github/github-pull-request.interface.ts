import type { PullRequestStatus } from "@prisma/client";

export interface GithubPullRequest {
  id: bigint;
  title: string;
  state: PullRequestStatus;
  merged_at: string | null;
  updated_at: string;
  created_at: string;
  user: {
    id: bigint;
  };
  assignees: {
    id: bigint | null;
  }[];
  requested_reviewers: { id: bigint | null }[];
}
