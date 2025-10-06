import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

// THIS IS A CRUCIAL WORKAROUND FOR SERIALIZATION ISSUE WITH BIGINTs
// eslint-disable-next-line no-extend-native
BigInt.prototype.toJSON = function (this: bigint): string {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Cors for frontend people to test their work
  app.enableCors({
    methods: ["GET"],
    origin: "http://localhost:5173",
    preflightContinue: false,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
