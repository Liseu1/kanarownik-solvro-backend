import { PartialType } from "@nestjs/mapped-types";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  username?: string;
  name?: string;
  lastName?: string;
  role?: string;
  assignedReviewer?: number;
  isActive?: boolean;
}
