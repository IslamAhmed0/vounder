import { Model } from 'objection';
import MenuCategoriesItemsModel from './MenuCategoriesItems';
import MenuOptions from './MenuOptions';
 export default  class MenuOptionsTopics extends Model {
  menu_options?:MenuOptions[]

    static get tableName() {
      return 'menu_options_topics';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
        return {
            menu_options: {
            relation: Model.HasManyRelation,
            modelClass: MenuOptions,
            join: {
                from: 'menu_options_topics.id',
              to: 'menu_options.menu_options_topics_id'
            }
          }
          ,menu_categories_items :{
            relation:Model.BelongsToOneRelation,
            modelClass:MenuCategoriesItemsModel,
            join: {
                from: 'menu_categories_items.id',
                to: 'menu_options_topics.menu_categories_items_id'
            }
          }
        };
      }
  }