import { Model } from 'objection';
import AreasModel from './Areas';
 export default  class RestaurantArea extends Model {

    static get tableName() {
      return 'restaurant_areas';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        areas: {
          relation: Model.HasManyRelation,
          modelClass: AreasModel,
          join: {
            from: 'areas.id',
            to: 'restaurant_areas.area_id'
          }
        }
      };
    }
  }