import { Model } from "objection";
import BranchesModel from "./BranchModel";
import DepartmentsModel from "./Departments";
import UsersModel from "./Users";



export default class restaurantApprovalAssginemtModel extends Model {

  
  
  
      static get tableName() {
        return 'restaurant_approval_assginemt';
      }
      static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
          department: {
            relation: Model.BelongsToOneRelation,
            modelClass: DepartmentsModel,
            join: {
              from: 'departments.id',
              to: 'restaurant_approval_assginemt.department_id'
            }
          }
          
          ,    restaurants: {
            relation: Model.BelongsToOneRelation,
            modelClass: __dirname + '/RestaurantModel',
            join: {
              from: 'restaurants.id',
              to: 'restaurant_approval_assginemt.restaurant_id'
            }
          }
          ,user :{
            relation:Model.BelongsToOneRelation,
            modelClass:UsersModel,
            join: {
              from: 'users.id',
              to: 'restaurant_approval_assginemt.user_id'
            }
          }
        }


    }
    }
    
    