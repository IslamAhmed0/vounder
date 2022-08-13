import { Model } from "objection";
import RestaurantModel from "./RestaurantModel";

export default class FavortiesModel extends Model {


  id?: number
  menu_categories_items_id?: number
  user_id!: number
  restaurant_id!: number

    static get tableName() {
      return 'favourites';
    }

    // static get idColumn() {
    //   return 'id';
    // }
    // static get jsonSchema() {
    //   return {
    //     type: 'object',
    //     required: ['restaurant_id'],
    //     properties: {
    //       id: { type: 'integer' },
    //       name: { type: 'string', minLength: 1, maxLength: 255 },
    //       age: { type: 'number' } // optional
    //     }
    //   };
    // }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
      return {
        
        restaurants: {
            relation: Model.BelongsToOneRelation,
            modelClass: RestaurantModel,
            join: {
                from: 'restaurants.id',
                to: 'favourites.restaurant_id'
            }
          } 
      };
    }
  }
  
  