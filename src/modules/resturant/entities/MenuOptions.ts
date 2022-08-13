import { Model } from 'objection';
import MenuOptionsTopics from './MenuOptionsTopics';
 export default  class MenuOptions extends Model {

    static get tableName() {
      return 'menu_options';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
            menu_options_topics: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuOptionsTopics,
            join: {
                from: 'menu_options.id',
              to: 'menu_options_topics.menu_categories_items'
            }
          }

        }
    }
  }