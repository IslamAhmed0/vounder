import { MiddlewareConsumer, Module } from "@nestjs/common";
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import verifyLang from "../../help/verifyLang";

@Module({
  controllers: [BranchesController],
  providers: [BranchesService]
})
export class BranchesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyLang).forRoutes("/branches")
  }
}
