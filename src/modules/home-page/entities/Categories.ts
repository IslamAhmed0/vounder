import { Model } from "objection";
import NewRequestsModel from "./NewRequests";
import RestaurantModel from "./RestaurantModel";

export default  class Categories extends Model {

  percentage?:number

    static get tableName() {
      return 'categories';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
      return {
        
        restaurants: {
          relation: Model.HasManyRelation,
          modelClass: RestaurantModel,
          join: {
            from: 'categories.id',
            to: 'restaurants.category_id'
          }
        } ,
        towns: {
          relation: Model.HasManyRelation,
          // The related model. This can be either a Model
          // subclass constructor or an absolute file path
          // to a module that exports one. We use a model
          // subclass constructor `Animal` here.
          modelClass: NewRequestsModel,
          join: {
            from: 'categories.id',
            to: 'new_requests.category_id'
          }
        }
      };
    }
  }