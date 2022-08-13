import { Model } from "objection";


export default class restaurant_attachmentsModel extends Model {

    photo!:string
    id?:number
    static get tableName() {
        return 'restaurant_attachments';
      }

      static relationMappings = {
        restaurants: {
          relation: Model.BelongsToOneRelation,
          modelClass: __dirname + '/RestaurantModel',
          join: {
            from: 'restaurants.id',
            to: 'restaurant_attachments.restaurant_id'
          }
        }
    }
}