import { Model } from "objection";


export default  class RestaurantGeneralStatusModel extends Model {

    static get tableName() {
      return 'restaurant_general_status';
    }

  }