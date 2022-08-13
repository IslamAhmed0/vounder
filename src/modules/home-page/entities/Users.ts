import { Model } from "objection";
import BillingAddressModel from "./Address";
import BranchesModel from "./BranchModel";
import DriversModel from "./DeliversModel";
import DepartmentPositionsModel from "./DepartmentPositions";
import DepartmentsModel from "./Departments";
import OrdersModel from "./OrdersModel";
import RestaurantModel from "./RestaurantModel";
import UserCopounWinnersModel from "./UserCopounWinners";
import UserGroupModel from "./UserGroup";


export default class UsersModel extends Model {



  user_group_id!: number
  username!: string
  password!: string 
  active!:number
  email_verified!:number
  mobile!:string
  department_id?:number
  id: any;

    static get tableName() {
      return 'users';
    }

    async $beforeInsert(queryContext:any) {
      await super.$beforeInsert(queryContext);

      console.log("iam now saving this user")
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        group: { 
          relation: Model.BelongsToOneRelation,
          modelClass: UserGroupModel,
          join: {
              from: 'user_groups.id',
              to: 'users.user_group_id'
          }
        } ,
        department: {
          relation: Model.BelongsToOneRelation,
          modelClass: DepartmentsModel,
          join: {
              from: 'departments.id',
              to: 'users.department_id'
          }
        } ,
        branches: {
          relation: Model.HasOneRelation,
          modelClass: BranchesModel,
          join: {
            from: 'users.id',
            to: 'branches.user_id'
          }
        }
        ,
        orders: {
          relation: Model.HasOneRelation,
          modelClass: OrdersModel,
          join: {
            from: 'users.id',
            to: 'orders.user_id'
          }
        }
       ,
        restaurants: {
          relation: Model.HasOneRelation,
          modelClass: RestaurantModel,
          join: {
            from: 'users.id',
            to: 'restaurants.user_id'
          }
        },
        driver: {
          relation: Model.HasOneRelation,
          modelClass: DriversModel,
          join: {

            from: 'users.id',
            to: 'delivers.user_id'
          }
        },
        
        department_positions: {
          relation: Model.BelongsToOneRelation,
          modelClass: DepartmentPositionsModel,
          join: { 
            from: 'department_positions.id',
            to: 'users.department_positions_id'
          }
        },
        billing_address: {
          relation: Model.HasManyRelation,
          modelClass: BillingAddressModel,
          join: {
            from: 'users.id',
            to: 'billing_address.user_id'
          }
        },
        user_copouns_winners: {
          relation: Model.HasManyRelation,
          modelClass: UserCopounWinnersModel,
          join: {
            from: 'users.id',
            to: 'user_copouns_winners.user_id'
          }
        }
      }; 
      
    }
  }