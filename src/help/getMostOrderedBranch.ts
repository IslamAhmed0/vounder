import OrdersModel from '../modules/branches/entities/OrdersModel';
import { dayOfWeekAsInteger } from './dayOfWeekAsInteger';

export async function getMostOrderedBranch(
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
console.log()
  currentday.setDate(currentday.getDate() + 1);

  const y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
  const lastFriday = new Date();
  lastFriday.setDate(t);
  const getMostOrderedBranchs = await OrdersModel.query()
    .innerJoinRelated('branches.[areas,restaurant]')
    .select([
      'branches:restaurant.' + name + ' as name',
      'branches:restaurant.id as RestauranthId',
      'branches:restaurant.cover',
      'branches:areas_join.delivery_time',
      'branches:areas_join.delivery_cost',
    ])
    .whereBetween('orders.created', [firstDay, currentday])
    .sum('orders.total as total')
    .count('orders.id as ordersnumber')
    .withGraphFetched(
      '[branches(filterBranch).restaurant(selectRestuarant).cuisines(filterCuisines)]',
    )
    .groupByRaw('orders.branch_id')
    .orderBy('total ', 'desc')
    .where({ 'branches:areas.google_id': google_id })
    .limit(limit)
    .modifiers({
      selectRestuarant: (query) =>
        query.select([
          'restaurants.' + name + ' as name',
          'restaurants.logo',
          'restaurants.cover',
          'restaurants.id as RestauranthId',
        ]),

      filterTimes: (query) =>
        query
          .where({ day_en: dayOfWeekAsInteger()[day] })
          .andWhere('open_time', '<', time)
          .andWhere('close_time', '>', time)
          .andWhere('isActive', '=', 1),
      filterCuisines: (query) =>
        query.select(['' + name + ' as name', 'cuisines.id']),
      filterBranch: (query) => query.select(['' + name + ' as name', 'id']),
    });
  return getMostOrderedBranchs;
}


