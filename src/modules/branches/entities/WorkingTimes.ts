import { Model } from "objection";
import BranchesModel from "./BranchModel";


export default  class WorkTimes extends Model {
  branchId!:number
  day!:string
  open_time!:string
  close_time!:string
  day_en!:string
  isActive!:number
  id!:number
    static get tableName() {
      return 'working_times';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
            branches: {
            relation: Model.BelongsToOneRelation,
            modelClass: BranchesModel,
            join: {
                from: 'branches.id',
              to: 'working_times.branchId'
            }
          }

        }
    }
  }