import { MiddlewareConsumer, Module } from "@nestjs/common";
import { HomePageService } from './home-page.service';
import { HomePageController } from './home-page.controller';
import verifyLang from "../../help/verifyLang";

@Module({
  controllers: [HomePageController],
  providers: [HomePageService]
})
export class HomePageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyLang).forRoutes("/vendor")
  }
}
