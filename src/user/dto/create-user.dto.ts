import type { UserRole } from "@prisma/client";

export class CreateUserDto {
  githubId: number;
  assignedReviewerId?: number;
  username: string;
  name: string;
  lastName: string;
  isActive?: boolean;
  role: UserRole;
}
