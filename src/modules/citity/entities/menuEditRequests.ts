import { Model } from 'objection';
import MenuCategoriesModel from './MenuCategories';
import MenuCategoriesItemsModel from './MenuCategoriesItems';
import MenuOptions from './MenuOptions';
import MenuOptionsTopics from './MenuOptionsTopics';
import OffersModel from './OffersModel';
import RestaurantModel from './RestaurantModel';
 export default  class menuEditRequestsModel extends Model {

    static get tableName() {
      return 'menu_edit_requests';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
            menu_option: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuOptions,
            join: {
                from: 'menu_options.id',
              to: 'menu_edit_requests.menu_options_id'
            }
          },
          items: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuCategoriesItemsModel,
            join: {
                from: 'menu_categories_items.id',
              to: 'menu_edit_requests.item_id'
            }
          }
          ,
          restaurant: {
            relation: Model.BelongsToOneRelation,
            modelClass: RestaurantModel,
            join: {
                from: 'restaurants.id',
              to: 'menu_edit_requests.restaurant_id'
            }
          }
          ,
         
        };
      }
  }