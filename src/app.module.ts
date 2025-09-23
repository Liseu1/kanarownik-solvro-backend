import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PullRequestModule } from "./pull-request/pull-request.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [PullRequestModule, TaskModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
