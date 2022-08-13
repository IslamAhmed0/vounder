import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import MenuCategoriesItemsModel from "./MenuCategoriesItems";
import RestaurantModel from "./RestaurantModel";

export default class MenuCategoriesModel extends Model {

    static get tableName() {
      return 'menu_categories';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        menu_categories_items: {
          relation: Model.HasManyRelation,
          modelClass: MenuCategoriesItemsModel,
          join: {
            from: 'menu_categories.id',
            to: 'menu_categories_items.menu_categories_id'
          }
        } ,
        restaurants: {
            relation: Model.BelongsToOneRelation,
            modelClass: RestaurantModel,
            join: {
                from: 'restaurants.id',
                to: 'menu_categories.restaurant_id'
            }
          } 
      };
    }
  }