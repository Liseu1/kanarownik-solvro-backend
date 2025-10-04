import { Module, ModuleMetadata } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { GithubModule } from "./github/github.module";
import { PullRequestModule } from "./pull-request/pull-request.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";

const imports: ModuleMetadata["imports"] = [
  PullRequestModule,
  TaskModule,
  UserModule,
  DatabaseModule,
  GithubModule,
];

if (process.env.NODE_ENV !== "test") {
  imports.push(ScheduleModule.forRoot());
}
@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
