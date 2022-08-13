import { Model } from "objection";

export default  class OrderStatus extends Model {

    static get tableName() {
      return 'order_status';
    }

  }