import {
  Header,
  Injectable,
  Headers,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import CitiesModel from './entities/Cities';
import { InjectModel } from 'nest-knexjs';
import TownsModel from './entities/Towns';
import { ModelClass } from 'objection';
import AreasModel from './entities/Areas';
@Injectable()
export class CitiyService {
  constructor(
    @InjectModel('CitiesModel') private modeClass: ModelClass<CitiesModel>,
  ) {}

  async findAll(): Promise<CitiesModel[]> {
    try {
      return await this.modeClass.query().select();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneCityId(id: string) {
    const cityById = await this.modeClass.query().findById(id);
    if (!cityById) {
      throw new NotFoundException();
    }
    return cityById;
  }


  //getTownsArea
  async getTownsArea(TownsId: string, name: string) {
    if (name == 'ar') {
      name = 'name';
    } else {
      name = 'name_en';
    }
    const allUsers = await AreasModel.query()
      .where('town_id', parseInt(TownsId))
      .select('id', 'town_id', '' + name + ' as name');
    return allUsers;
  }

  async getCityTowns(city_id: string, name: string) {
    console.log(city_id,name)
    if (name == 'ar') {
      name = 'name';
    } else {
      name = 'name_en';
    }
    const allUsers = await TownsModel.query()
      .where('city_id',parseInt(city_id)).select('id','city_id',''+name+' as name')

    return allUsers;
  }
}
