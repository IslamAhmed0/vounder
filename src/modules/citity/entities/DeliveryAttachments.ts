import { Model } from "objection";


export default  class DeliveryAttachmentsModel extends Model {
  photo!:string
  delivery_id?:string
    static get tableName() {
      return 'delivery_attachments';
    }

  }