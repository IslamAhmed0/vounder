import { Model } from "objection";
import DepartmentsModel from "./Departments";
import MenuCategoriesItemsModel from "./MenuCategoriesItems";
import RestaurantModel from "./RestaurantModel";

export default  class OffersModel extends Model {

    static get tableName() {
      return 'offers';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.        
        return {
            menu_categories_items: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuCategoriesItemsModel,
            join: {
                from: 'menu_categories_items.id',
              to: 'offers.menu_categories_items_id'
            }
          },  restaurants: {
            relation: Model.BelongsToOneRelation,
            modelClass: RestaurantModel,
            join: {
                from: 'restaurants.id',
              to: 'offers.restaurant_id'
            }
          },   department: {
            relation: Model.BelongsToOneRelation,
            modelClass: DepartmentsModel,
            join: {
              from: 'departments.id',
              to: 'offers.department_id'
            }
          }
        }
    }
  }