import { Model } from 'objection';
import MenuCategoriesModel from './MenuCategories';
import MenuOptionsTopics from './MenuOptionsTopics';
import OffersModel from './OffersModel';
 export default  class MenuCategoriesItemsModel extends Model {

    static get tableName() {
      return 'menu_categories_items';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
            menu_options_topics: {
            relation: Model.HasManyRelation,
            modelClass: MenuOptionsTopics,
            join: {
                from: 'menu_categories_items.id',
              to: 'menu_options_topics.menu_categories_items_id'
            }
          },
          offers: {
            relation: Model.HasManyRelation,
            modelClass: OffersModel,
            join: {
                from: 'menu_categories_items.id',
              to: 'offers.menu_categories_items_id'
            }
          }
          ,menu_categories :{
            relation:Model.BelongsToOneRelation,
            modelClass:MenuCategoriesModel,
            join: {
                from: 'menu_categories.id',
                to: 'menu_categories_items.menu_categories_id'
            }
          }
        };
      }
  }