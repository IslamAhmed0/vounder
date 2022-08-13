import { Model } from "objection";
import AdsSpacePricesModel from "./AdsSpacePricesModel";
import DepartmentsModel from "./Departments";
import MenuCategoriesItemsModel from "./MenuCategoriesItems";

export default  class SlidersModel extends Model {
    

    static get tableName() {
      return 'sliders';
    }


    static relationMappings = {
      restaurants: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/RestaurantModel',
        join: {
          from: 'restaurants.id',
          to: 'sliders.restaurant_id'
        }
      },
      items: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenuCategoriesItemsModel,
        join: {
          from: 'menu_categories_items.id',
          to: 'sliders.item_id'
        }
      },   department: {
        relation: Model.BelongsToOneRelation,
        modelClass: DepartmentsModel,
        join: {
          from: 'departments.id',
          to: 'sliders.department_id'
        }
      }
      
      ,   adsPrices: {
        relation: Model.BelongsToOneRelation,
        modelClass: AdsSpacePricesModel,
        join: {
          from: 'ads_space_prices.id',
          to: 'sliders.ads_position_price_id'
        }
      }
      , 
  }
  }