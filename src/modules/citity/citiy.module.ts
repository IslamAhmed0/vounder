import { CitiyService } from './citiy.service';
import { CitiyController } from './citiy.controller';
import CitiesModel from './entities/Cities';
import { Module } from '@nestjs/common';

@Module({
  providers: [CitiyService],
  controllers: [CitiyController],
})
export class CitiyModule {}
