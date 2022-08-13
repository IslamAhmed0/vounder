import WalletModel from '../modules/home-page/entities/Wallets';
import { raw } from 'objection';
import { dayOfWeekAsInteger } from './dayOfWeekAsInteger';

export async function getVendorOffersData(
  name: string,
  limit: number,
  description: string,
  google_id: string,
) {
  const d = new Date();
  const day = d.getDay();
  const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  console.log(time);

  const GetPercentageForVendors = await WalletModel.query()

    .joinRelated('[restaurants.branches.areas]')
    .leftJoinRelated('[transaction]')
    .select('wallets.id')

    .limit(limit)
    .where({ 'restaurants:branches:areas.google_id': google_id })
    .limit(limit)

    .withGraphFetched(
      '[restaurants(selectRestuarant).cuisines(filterCuisines)]',
    )
    .modifiers({
      selectRestuarant: (query) =>
        query
          .select([
            'restaurants.' + name + ' as name',
            'restaurants.logo',
            'restaurants.cover',
            'restaurants.id as RestauranthId',
            'branches:areas_join.delivery_time',
            'branches:areas_join.delivery_cost',
          ])
          .joinRelated('[branches.areas]')
          .avg('rates.rate as rate')
          .groupBy('restaurants.id')
          .leftJoinRelated('[branches as WT.worktimes(filterTimes),rates]')

          .select(
            raw(
              'CASE WHEN  ?? is not null THEN "true" ELSE "false" END AS IsOpen',
              'WT:worktimes.id',
            ),
          ),
      filterTimes: (query) =>
        query
          .where({ day_en: dayOfWeekAsInteger()[day] })
          .andWhere('open_time', '<', time)
          .andWhere('close_time', '>', time)
          .andWhere('isActive', '=', 1),
      filterCuisines: (query) =>
        query.select(['' + name + ' as name', 'cuisines.id']),
    });

  return GetPercentageForVendors;
}
