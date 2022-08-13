import { Model } from "objection";


export default  class RestaurantsTypes extends Model {

    static get tableName() {
      return 'restaurants_types';
    }

  }