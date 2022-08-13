import RestaurantModel from '../modules/citity/entities/RestaurantModel';
import { dayOfWeekAsInteger } from './dayOfWeekAsInteger';
import { raw } from 'objection';

export async function GetFreeDliveryBranches(
  name: string,
  description: string,
  google_id: string,
  limit: number,
) {
  const currentday = new Date();
  const date = new Date();
  const day = date.getDay();
  const time =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  currentday.setDate(currentday.getDate() + 1);

  const numDeleted = await RestaurantModel.query()

    .select([
      'restaurants.' + name + ' as name',
      'restaurants.id as RestauranthId',
      'offers.' + description + ' as description',
      'restaurants.logo',
      'restaurants.cover as cover',
      'branches:areas_join.delivery_time',
      'branches:areas_join.delivery_cost',
    ])
    .withGraphFetched('[cuisines(filterCuisines)]')
    .avg('rates.rate as rate')
    .where({ 'branches:areas.google_id': google_id })
    .limit(limit)
    .groupBy('restaurants.id')

    .joinRelated('[branches.areas]')
    .leftJoinRelated(
      '[branches as WT.worktimes(filterBranchTimes),offers(filterTimes),rates]',
    )
    .orderBy('branches:areas_join.delivery_time')

    .select(
      raw(
        'CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',
        'WT:worktimes.id',
      ),
    )

    .andWhere({ 'branches:areas_join.delivery_cost': 0 })
    .modifiers({
      filterCuisines: (query) =>
        query.select('cuisines.id').select({ name }).as('name'),
      filterBranchTimes: (query) =>
        query
          .where({ day_en: dayOfWeekAsInteger()[day] })
          .andWhere('open_time', '<', time)
          .andWhere('close_time', '>', time)
          .andWhere('isActive', '=', 1),

      filterTimes: (query) =>
        query.andWhere('start_date', '<', date).andWhere('end_date', '>', date),
    });

  return numDeleted;
}
