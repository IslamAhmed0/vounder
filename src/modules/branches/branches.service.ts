import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import RestaurantModel from './entities/RestaurantModel';
import { request } from 'express';
import { raw } from 'objection';
import CuisinesModel from './entities/CuisinesModel';
import OrdersModel from './entities/OrdersModel';
import { getMostOrderedBranch } from '../../help/getMostOrderedBranch';
import { dayOfWeekAsInteger } from "../../help/dayOfWeekAsInteger";
@Injectable()
export class BranchesService {
  create(createBranchDto: CreateBranchDto) {
    return 'This action adds a new branch';
  }

  findAll() {
    return `This action returns all branches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }

  //getBranchesByAreas
  async getBranchesByAreas( name:string,request) {
    console.log(request.body)
    const d = new Date();
    const day = d.getDay();
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log(time);
    console.log(dayOfWeekAsInteger()[day]);
    let description = 'description';
    if (name == 'ar') {
      name = 'name';
      description = 'description';
    } else {
      name = 'name_en';
      description = 'description_en';
    }
    const numDeleted = await RestaurantModel.query()
      .select([
        'restaurants.' + name + ' as name',
        'restaurants.logo',
        'restaurants.cover',
        'restaurants.id as RestauranthId',
        'menu_categories.id as MenuCategoriesId',
        'branches:areas_join.delivery_time',
        'branches:areas_join.area_id',
        'branches.user_id',
        'branches:areas_join.delivery_cost',
      ])
      .select(
        raw(
          'CASE WHEN ?? is not null THEN "true" ELSE "false" END AS IsOpen',
          'WT:worktimes.id',
        ),
      )
      .select(
        raw(
          'CASE WHEN ?? is not null THEN ?? ELSE "false" END AS offerDescription',
          'menu_categories:menu_categories_items:offers.' + description,
          'menu_categories:menu_categories_items:offers.' + description,
        ),
      )

      .withGraphFetched('[cuisines(filterCuisines)]')
      .joinRelated('[branches.areas]')
      .leftJoinRelated('[menu_categories.menu_categories_items.offers,rates]')
      .leftJoinRelated('branches as WT.worktimes(filterTimes)')
      .modifiers({
        filterCuisines: (query) =>
          query.select(['' + name + ' as name', 'cuisines.id']),
        filterTimes: (query) =>
          query
            // .where({ day_en: dayOfWeekAsInteger()[day] })
            .andWhere('open_time', '<', time)
            .andWhere('close_time', '>', time)
            .andWhere('isActive', '=', 1),
      })
      .where({ area_id: request.body.area_id, category_id: request.body.CatId })
      .orWhere({
        'branches:areas.google_id': request.body.google_id,
        category_id: request.body.CatId,
      })
      .andWhere({ 'branches.activated': 1 })

      .avg('rates.rate as rate')
      .groupBy('restaurants.id');
    console.log("numDeleted",numDeleted)
    return numDeleted;
  }

  //getCusinesList
  async getCusinesList(CatId: string, name: string) {
    let description = 'description';
    if (name == 'ar') {
      name = 'name';
      description = 'description';
    } else {
      name = 'name_en';
      description = 'description_en';
    }

    if (parseInt(CatId) != 0) {
      const allUsers = await CuisinesModel.query()
        .where('category_id', CatId)
        .select('*', '' + name + ' as name');
      return allUsers;
    } else {
      const allUsers = await CuisinesModel.query()
        .select('*', '' + name + ' as name')
        .withGraphFetched('categories');
      return allUsers;
    }
  }

  //getMostOrderedBranchs
  async getMostOrderedBranchs(req) {
    const getMostOrderedBranchs = await getMostOrderedBranch(
      req.name,
      req.description,
      req.body.googleId,
      100,
    );
    return getMostOrderedBranchs;
  }
}
