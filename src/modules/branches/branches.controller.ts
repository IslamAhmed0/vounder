import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Req
} from "@nestjs/common";
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.branchesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
  //   return this.branchesService.update(+id, updateBranchDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.branchesService.remove(+id);
  //}

  //getBranchesByAreas'
  @Post('/getBranchesByAreas')
  getBranchesByAreas(@Req() req) {
    console.log("gjhgjhgj",req)
   return this.branchesService.getBranchesByAreas(req.headers['lang'],req);
  }

  //getCusinesList
  @Get('/getCusinesList/:CatId')
  getCusinesList(@Param('CatId') CatId: string, @Req() req) {
    return this.branchesService.getCusinesList(CatId, req.headers['lang']);
  }

  //getMostOrderedBranchs
  @Post('/getMostOrderedBranchs')
  getMostOrderedBranchs(@Req() req) {
    console.log(req.body)
    return this.branchesService.getMostOrderedBranchs(req);
  }
}
