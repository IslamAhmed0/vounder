import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiyModule } from './modules/citity/citiy.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/db.config';
import { BranchesModule } from './modules/branches/branches.module';
import { ResturantModule } from './modules/resturant/resturant.module';
import { HomePageModule } from './modules/home-page/home-page.module';
import { VendorModule } from './modules/vendor/vendor.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CitiyModule,
    BranchesModule,
    ResturantModule,
    HomePageModule,
    VendorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
