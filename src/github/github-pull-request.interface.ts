import type { PullRequestStatus } from "@prisma/client";

export interface GithubPullRequest {
  id: number;
  title: string;
  state: PullRequestStatus;
  merged_at: string | null;
  updated_at: string;
  created_at: string;
  user: {
    id: number;
  };
  assignees: {
    id: number | undefined;
  }[];
  requested_reviewers: { id: number | undefined }[];
}
