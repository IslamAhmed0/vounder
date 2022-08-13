import { Model } from "objection";


export default  class DepartmentsModel extends Model {

    static get tableName() {
      return 'departments';
    }

  }