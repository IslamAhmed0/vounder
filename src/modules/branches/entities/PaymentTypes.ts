import { Model } from "objection";


 export default  class PaymentTypesModel extends Model {

    static get tableName() {
      return 'paymenttypes';
    }

  }