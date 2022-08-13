import { Model } from "objection";
import BranchesModel from "./BranchModel";
import DriversModel from "./DeliversModel";
import OrdersModel from "./OrdersModel";
import UsersModel from "./Users";



export default class deliversOrdersCanceledModel extends Model {

  
  
  
      static get tableName() {
        return 'delivers_orders_canceled';
      }
      static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
          delivers: {
            relation: Model.BelongsToOneRelation,
            modelClass: DriversModel,
            join: {
              from: 'delivers.id',
              to: 'delivers_orders_canceled.delivery_id'
            }
          }
          
          ,
        
          orders: {
            relation: Model.BelongsToOneRelation,
            modelClass: OrdersModel,
            join: {
              from: 'orders.id',
              to: 'delivers_orders_canceled.order_id'
            }
          }
          
        }


    }
    }
    
    