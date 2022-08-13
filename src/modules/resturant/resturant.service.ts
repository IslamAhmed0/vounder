import { Injectable } from '@nestjs/common';
import { CreateResturantDto } from './dto/create-resturant.dto';
import { UpdateResturantDto } from './dto/update-resturant.dto';
import CuisinesModel from "./entities/CuisinesModel";
import { dayOfWeekAsInteger } from "../../help/dayOfWeekAsInteger";
import RestaurantModel from "./entities/RestaurantModel";
import { raw } from 'objection';

@Injectable()
export class ResturantService {
  create(createResturantDto: CreateResturantDto) {
    return 'This action adds a new resturant';
  }

  findAll() {
    return `This action returns all resturant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resturant`;
  }

  update(id: number, updateResturantDto: UpdateResturantDto) {
    return `This action updates a #${id} resturant`;
  }

  remove(id: number) {
    return `This action removes a #${id} resturant`;
  }

  async getCusinesList(name:string,req,category_id) {
    var description = "description";
    if (name == "ar") {
      name = "name";
      description = "description";
    } else {
      name = "name_en";
      description = "description_en";

    }
    if (req.params.CatId != 0) {
      const allUsers = await CuisinesModel.query().where("category_id", category_id)
        .select('*', '' + name + ' as name')
      return allUsers
    } else {
      const allUsers = await CuisinesModel.query()
        .select('*', '' + name + ' as name').withGraphFetched('categories')
       return allUsers

    }

  }

  //getBranchesByAreas
  async getBranchesByAreas(req,name,area_id,catId) {
    const d = new Date();
    let day = d.getDay();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(time)

    console.log(dayOfWeekAsInteger()[day])
    var description = "description";
    if (name == "ar") {
      name = "name";
      description = "description";
    } else {
      name = "name_en";
      description = "description_en";

    }
    const numDeleted = await RestaurantModel.query()
      .select(['restaurants.' + name + ' as name', 'restaurants.logo', 'restaurants.cover',
        'restaurants.id as RestauranthId',
        'menu_categories.id as MenuCategoriesId', "branches:areas_join.delivery_time", "branches:areas_join.area_id", "branches.user_id", "branches:areas_join.delivery_cost"
      ])
      .select(raw('CASE WHEN ?? is not null THEN "true" ELSE "false" END AS IsOpen', "WT:worktimes.id"))
      .select(raw('CASE WHEN ?? is not null THEN ?? ELSE "false" END AS offerDescription'
        , 'menu_categories:menu_categories_items:offers.' + description,
        'menu_categories:menu_categories_items:offers.' + description))

      .withGraphFetched('[cuisines(filterCuisines)]')
      .joinRelated('[branches.areas]')
      .leftJoinRelated('[menu_categories.menu_categories_items.offers,rates]')
      .leftJoinRelated('branches as WT.worktimes(filterTimes)')
      .modifiers({
        filterCuisines: query => query.select(['' + name + ' as name', 'cuisines.id'])
        ,

        filterTimes: query => query.where({ 'day_en': dayOfWeekAsInteger()[day] })
          .andWhere('open_time', '<', time)
          .andWhere('close_time', '>', time)
          .andWhere('isActive', '=', 1)

        ,
      })
      .where({ 'area_id': area_id, "category_id": catId })
      .orWhere({ 'branches:areas.google_id': req.body.google_id, "category_id": catId })
      .andWhere({ 'branches.activated': 1 })

      .avg('rates.rate as rate')
      .groupBy('restaurants.id')
    ;
    return numDeleted
  }
}
