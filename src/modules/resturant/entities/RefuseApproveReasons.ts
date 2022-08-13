import { Model } from "objection";
import DepartmentsModel from "./Departments";


export default  class RefuseApproveReasonsModel extends Model {

    static get tableName() {
      return 'refuse_approve_reasons';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
      return {
        
        department: {
            relation: Model.BelongsToOneRelation,
            modelClass: DepartmentsModel,
            join: {
                from: 'departments.id',
                to: 'refuse_approve_reasons.department_id'
            }
          } 
      };
    }
  }