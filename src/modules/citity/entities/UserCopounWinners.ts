import { Model } from "objection";

export default  class UserCopounWinnersModel extends Model {
  user_id:any
  copouns_type:any
    static get tableName() {
      return 'user_copouns_winners';
    }

  }