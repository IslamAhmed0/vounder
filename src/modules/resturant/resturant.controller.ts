import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { ResturantService } from './resturant.service';
import { CreateResturantDto } from './dto/create-resturant.dto';
import { UpdateResturantDto } from './dto/update-resturant.dto';

@Controller('restaurant')
export class ResturantController {
  constructor(private readonly resturantService: ResturantService) {}

  @Post()
  create(@Body() createResturantDto: CreateResturantDto) {
    return this.resturantService.create(createResturantDto);
  }

  @Get()
  findAll() {
    return this.resturantService.findAll();
  }

  @Get('/getCusinesList/:category_id')
  getCusinesList( @Req() req, @Param('category_id') category_id) {
    return this.resturantService.getCusinesList(req.headers['lang'],req,category_id);
  }



  @Post('/getBranchesByAreas/:area_id/:catid')
  getBranchesByAreas(@Req() req,@Param('area_id') area_id,@Param('catid') catid ) {
    console.log(req.param('area_id'))
    return this.resturantService.getBranchesByAreas(req,req.headers['lang'],area_id,catid);
  }

}
