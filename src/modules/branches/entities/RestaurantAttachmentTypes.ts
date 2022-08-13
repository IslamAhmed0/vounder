import { Model } from 'objection';
import AreasModel from './Areas';
import restaurant_attachmentsModel from './ResturantAttachment';
 export default  class RestaurantAttachmentTypesModel extends Model {

    static get tableName() {
      return 'restaurant_attachments_types';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        attahcment: {
          relation: Model.HasManyRelation,
          modelClass: restaurant_attachmentsModel,
          join: {
            from: 'restaurant_attachments_types.id',
            to: 'restaurant_attachments.type'
          }
        }
      };
    }
  }