import { Model } from "objection";
import AdsSpacePricesModel from "./AdsSpacePricesModel";
import DepartmentsModel from "./Departments";
import RestaurantModel from "./RestaurantModel";


export default  class AdsSpacesNameModel extends Model {

    static get tableName() {
      return 'ads_spaces_positions';
    }
 
    
    static relationMappings = {
   
      AdsSpacesprice: {
          relation: Model.HasManyRelation,
          modelClass: __dirname + '/AdsSpacePricesModel',
          join: {
            from: 'ads_spaces_positions.id',
            to: 'ads_space_prices.ads_space_positions_id'
          }
     
        }
       
      };

  }