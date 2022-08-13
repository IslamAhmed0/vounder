import { dayOfWeekAsInteger } from './dayOfWeekAsInteger';
import { raw } from "objection";
import RestaurantModel from "../modules/citity/entities/RestaurantModel";

export async function GetNewOffer(
  name: string,
  description: string,
  google_id: string,
  limit: number,
) {
  const date = new Date();
  const day = date.getDay();
  const time =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  const lastoffers = await RestaurantModel.query()
    .select([
      'restaurants.' + name + ' as name',
      'restaurants.id as RestauranthId',
      'offers.' + description + ' as description',
      'offers.img as cover',
      'branches:areas_join.delivery_time',
      'branches:areas_join.delivery_cost',
    ])

    .withGraphFetched('[cuisines(filterCuisines)]')
    .joinRelated('[branches.areas]')
    .avg('rates.rate as rate')
    .where({ 'branches:areas.google_id': google_id })
    .limit(limit)

    .joinRelated('[branches.areas,offers(filterTimes)]')
    .leftJoinRelated('[branches as WT.worktimes(filterBranchTimes),rates]')

    .select(
      raw(
        'CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',
        'WT:worktimes.id',
      ),
    )

    .groupBy('RestauranthId')
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
        query
          .andWhere('start_date', '<', date)
          .andWhere('end_date', '>', date)
          .andWhere({ publish: 1 }),
    });

  return lastoffers;
}
