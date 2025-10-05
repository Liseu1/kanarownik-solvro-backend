import type { UserRole } from "@prisma/client";

export class GetUserDto {
  githubId: bigint;
  assignedReviewerId: bigint | null;
  assignedReviewerUsername: string | null;
  username: string;
  name: string;
  lastName: string;
  isActive: boolean;
  role: UserRole;
}
