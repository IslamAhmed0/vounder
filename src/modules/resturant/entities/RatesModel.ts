import { Model } from "objection";


export default class RatesModel extends Model {

  order_id!:number
  restaurant_id!:number
  comment!:string
  rate!:string
    static get tableName() {
        return 'rates';
      }

      static relationMappings = {
        restaurants: {
          relation: Model.BelongsToOneRelation,
          modelClass: __dirname + '/RestaurantModel',
          join: {
            from: 'restaurants.id',
            to: 'rates.restaurant_id'
          }
        }
    }
}