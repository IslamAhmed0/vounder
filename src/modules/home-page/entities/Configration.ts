import { Model } from "objection";

export default  class ConfirgrationsModel extends Model {
    percentage: any;
  value: any;

    static get tableName() {
      return 'configrations';
    }

  }