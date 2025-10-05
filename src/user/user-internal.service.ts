import { UserRole } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { UserService } from "./user.service";

@Injectable()
export class UserInternalService extends UserService {
  async findAllWithRole(role: UserRole) {
    return this.database.user.findMany({
      select: { githubId: true },
      where: { role },
    });
  }
}
