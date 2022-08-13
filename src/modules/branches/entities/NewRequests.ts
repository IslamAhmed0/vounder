import { Model } from "objection";
import Categories from "./Categories";


export default  class NewRequestsModel extends Model {

    static get tableName() {
      return 'new_requests';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
      return {
        cateogry :{
          relation:Model.BelongsToOneRelation,
          modelClass:Categories,
          join: {
            from: 'categories.id',
            to: 'new_requests.category_id'
          }
        }
      };
    }
   
  }