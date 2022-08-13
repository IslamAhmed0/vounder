import { Model } from "objection";
import DepartmentsModel from "./Departments";
import RestaurantModel from "./RestaurantModel";


export default  class RestaurantAdsSpaceModel extends Model {

    static get tableName() {
      return 'restaurant_ads_space';
    }

    static relationMappings = {
  
        departments: {
          relation: Model.HasOneRelation,
          modelClass: DepartmentsModel,
          join: {
            from: 'departments.id',
            to: 'restaurant_ads_space.department_id'
          }
     
        },
        restuarants :{
          relation:Model.HasOneRelation,
          modelClass:RestaurantModel,
          join: {
            from: 'restaurants.id',
            to: 'restaurant_ads_space.restaurant_id'
          }
        } 
       
      };

  }