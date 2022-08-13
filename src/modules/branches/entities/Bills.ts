import { Model } from "objection";
import BranchesModel from "./BranchModel";

export default class BillsModel extends Model {

  created: Date = new Date()
    static get tableName() {
        return 'Bills';
      }

      static relationMappings = {
        
        branches: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/BranchModel',
            join: {
                from: 'branches.id',
                to: 'Bills.branch_id'
            }
          } 
    }
}