import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../src/database/database.module";
import { UserInternalService } from "./user-internal.service";

describe("UserInternalService", () => {
  let service: UserInternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserInternalService],
    }).compile();

    service = module.get<UserInternalService>(UserInternalService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
