import { Model } from "objection";

export default  class CustomerSupportModel extends Model {
    percentage: any;
  value: any;

    static get tableName() {
      return 'customer_supports';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        return {
          
          submenu: {
              relation: Model.HasManyRelation,
              modelClass: CustomerSupportModel,
              join: {
                  from: 'customer_supports.id',
                  to: 'customer_supports.sub'
              }
            } 
         
        };
      }
  }