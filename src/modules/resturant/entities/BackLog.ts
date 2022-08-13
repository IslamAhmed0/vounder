import { Model } from "objection";
import BranchesModel from "./BranchModel";
import UsersModel from "./Users";

export default class BackLogsModel extends Model {

  created: Date = new Date()
    static get tableName() {
        return 'backlogs';
      }

      static relationMappings = {
        
        user :{
            relation:Model.BelongsToOneRelation,
            modelClass:UsersModel,
            join: {
              from: 'users.id',
              to: 'backlogs.user_id'
            }
          },
         
             restaurants: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/RestaurantModel',
            join: {
              from: 'restaurants.id',
              to: 'backlogs.restaurant_id'
            }
          }
    }
}