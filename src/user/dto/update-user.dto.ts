import type { UserRole } from "@prisma/client";

import { PartialType } from "@nestjs/mapped-types";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  assignedReviewerId?: number;
  username?: string;
  name?: string;
  lastName?: string;
  isActive?: boolean;
  role?: UserRole;
}
