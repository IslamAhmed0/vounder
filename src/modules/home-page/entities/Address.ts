import { Model } from "objection";
import AreasModel from "./Areas";


export default class BillingAddressModel extends Model {

    id!: number
    first_name!: string
    address!:string
    floor_number!:number
    apartment_number!:number
    notes!:string
    latitude!:number 
    longitude!:number
    user_id!: number
    area_id!: number
    restaurant_id!: number
  

    static get tableName() {
        return 'billing_address';
      }

      static relationMappings = {
        users: {
          relation: Model.BelongsToOneRelation,
          modelClass: __dirname + '/RestaurantModel',
          join: {
            from: 'billing_address.id',
            to: 'billing_address.user_id'
          }
        },
 areas: {
          relation: Model.BelongsToOneRelation,
          modelClass: __dirname + '/Areas',
          join: {
            from: 'areas.id',
            to: 'billing_address.area_id'
          }
        }
    }
}