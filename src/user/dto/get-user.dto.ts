import type { UserRole } from "@prisma/client";

export class GetUserDto {
  githubId: number;
  assignedReviewerId: number;
  assignedReviewerUsername: string;
  username: string;
  name: string;
  lastName: string;
  isActive: boolean;
  role: UserRole;
}
