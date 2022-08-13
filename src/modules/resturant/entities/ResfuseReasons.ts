import { Model } from "objection";


export default  class ResfuseReasonsModel extends Model {

    static get tableName() {
      return 'cancel_reasons';
    }

  }