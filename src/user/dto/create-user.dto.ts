import type { UserRole } from "@prisma/client";

export class CreateUserDto {
  githubId: bigint;
  assignedReviewerId?: bigint | null;
  username: string;
  name: string;
  lastName: string;
  isActive?: boolean;
  role: UserRole;
}
