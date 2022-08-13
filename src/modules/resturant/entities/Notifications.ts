import { Model } from "objection";


export default  class NotificationModel extends Model {

    static get tableName() {
      return 'notifications';
    }

  }