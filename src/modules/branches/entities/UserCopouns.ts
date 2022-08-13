import { Model } from "objection";
import OrdersModel from "./OrdersModel";
import UserCopounWinnersModel from "./UserCopounWinners";
import UsersModel from "./Users";


export default  class UserCopounsModel extends Model {
    title?:string
    id?:number
    used?:number
    user_id?:number
    order_id?:number
    static get tableName() {
      return 'user_coupons';
    } 


    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {

      
        createdBy :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'user_coupons.createdBy'
          }
        }
        ,
        orders :{
          relation:Model.BelongsToOneRelation,
          modelClass:OrdersModel,
          join: {
            from: 'orders.id',
            to: 'user_coupons.order_id'
          }
        },
        users: {
          relation: Model.BelongsToOneRelation,
          modelClass: UsersModel,
          join: {
            from: 'users.id',
            to: 'user_coupons.user_id'
          }
        }

      };
    }

  }