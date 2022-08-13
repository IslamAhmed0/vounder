import { MiddlewareConsumer, Module } from "@nestjs/common";
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import verifyLang from "../../help/verifyLang";

@Module({
  controllers: [VendorController],
  providers: [VendorService]
})
export class VendorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyLang).forRoutes("/home-page")
  }
}
