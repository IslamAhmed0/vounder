import {
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CitiyService } from './citiy.service';
import CitiesModel from './entities/Cities';

@Controller('cities')
export class CitiyController {
  constructor(private readonly citiyService: CitiyService) {}

  @Get('/city')
  findAll() {
    return this.citiyService.findAll();
  }
  @Get(':id')
  findById(@Param('area_id') id: string) {
    return this.citiyService.findOneCityId(id);
  }

  @Get('/getTownsArea/:TownsId')
  getTownsArea(@Param('TownsId') TownsId: string, @Req() req) {
    return this.citiyService.getTownsArea(TownsId, req.headers['lang']);
  }

  @Get('/getCityTowns/:city_id')
  getCityTowns(@Param('city_id') city_id: string, @Req() req) {
    return this.citiyService.getCityTowns(city_id, req.headers['lang']);
  }
}
