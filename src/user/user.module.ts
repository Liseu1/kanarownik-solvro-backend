import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { UserInternalService } from "./user-internal.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserInternalService],
  exports: [UserInternalService],
})
export class UserModule {}
