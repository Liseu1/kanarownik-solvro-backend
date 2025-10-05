import { DatabaseModule } from "src/database/database.module";

import { Module } from "@nestjs/common";

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
