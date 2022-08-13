import OrderDetailsModel from '../modules/citity/entities/OrderDetails';

export async function MostSellItem(google_id: string, limit: number) {
  const currentday = new Date();
  currentday.setDate(currentday.getDate() + 1);

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
  const lastFriday = new Date();
  lastFriday.setDate(t);
  const BestSeller = await OrderDetailsModel.query()
    .innerJoinRelated('[orders.branches.areas,menu_categories_items]')
    .whereBetween('orders.created', [firstDay, currentday])
    .sum('order_details.amount as itemamount')
    .sum('order_details.total as itemtotal')
    .where({ 'orders:branches:areas.google_id': google_id })

    .limit(limit)
    .withGraphFetched('[menu_categories_items]')
    .groupByRaw('order_details.menu_categories_itemId');
  return BestSeller;
}
