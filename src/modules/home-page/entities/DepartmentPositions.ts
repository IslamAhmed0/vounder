import { Model } from "objection";
import DepartmentsModel from "./Departments";


export default  class DepartmentPositionsModel extends Model {

    static get tableName() {
      return 'department_positions';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
          department: {
            relation: Model.BelongsToOneRelation,
            modelClass: DepartmentsModel,
            join: {
              from: 'departments.id',
              to: 'department_positions.department_id'
            }
          }
          

        }

    }
  }