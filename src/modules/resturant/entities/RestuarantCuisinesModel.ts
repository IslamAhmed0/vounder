import { Model } from 'objection';
import CuisinesModel from './CuisinesModel';
 export default  class RestuarantCuisinesModel extends Model {


  restaurant_id?:string
  cuisine_id?:number 


    static get tableName() {
      return 'restaurant_cuisine';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
      return {
        cuisines: {
          relation: Model.BelongsToOneRelation,
          // The related model. This can be either a Model
          // subclass constructor or an absolute file path
          // to a module that exports one. We use a model
          // subclass constructor `Animal` here.
          modelClass: CuisinesModel,
          join: {
            from: 'cuisines.id',
            to: 'restaurant_cuisine.cuisine_id'
          }
        }
      };
    }
  }