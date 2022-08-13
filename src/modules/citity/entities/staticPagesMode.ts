import { Model } from "objection";

export default  class staticPagesModel extends Model {

    static get tableName() {
      return 'static_pages';
    }

  }