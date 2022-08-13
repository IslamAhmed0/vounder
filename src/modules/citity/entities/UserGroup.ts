import { Model } from "objection";

export default  class UserGroupModel extends Model {

    static get tableName() {
      return 'user_groups';
    }

  }