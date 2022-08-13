import { Model } from "objection";
import AdsSpacesNameModel from "./AdsSpacesName";
import DepartmentsModel from "./Departments";
import RestaurantModel from "./RestaurantModel";
import SlidersModel from "./SlidersModel";


export default  class AdsSpacePricesModel extends Model {

    static get tableName() {
      return 'ads_space_prices';
    }
  
    
    static relationMappings = {
  
      AdsSpacesName: {
          relation: Model.BelongsToOneRelation,
          modelClass: AdsSpacesNameModel,
          join: {
            from: 'ads_spaces_positions.id',
            to: 'ads_space_prices.ads_space_positions_id'
          }
     
        },
        sliders: {
          relation: Model.HasOneRelation,
          // The related model. This can be either a Model
          // subclass constructor or an absolute file path
          // to a module that exports one. We use a model
          // subclass constructor `Animal` here.
          modelClass: __dirname + '/SlidersModel',
          join: {
            from: 'ads_space_prices.id',
            to: 'sliders.ads_position_price_id'
          }
        }
      };

  }