import { Model } from "objection";


export default  class ComplaintsReplyModel extends Model {

    static get tableName() {
      return 'complaints_replies';
    }

  } 