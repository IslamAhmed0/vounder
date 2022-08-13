import { Model } from "objection";


export default  class RestaurantsStatusModel extends Model {

    static get tableName() {
      return 'restaurants_status';
    }

  }