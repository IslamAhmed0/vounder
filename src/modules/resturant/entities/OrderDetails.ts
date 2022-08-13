import { Model } from "objection";
import OrdersModel from "./OrdersModel";
import MenuCategoriesItemsModel from "./MenuCategoriesItems";
import OrderDetailsOptionsModel from "./OrderDetailsOptions";

export default class OrderDetailsModel extends Model {

    menu_categories_itemId!: number
    amount!: number
    total!: number
    order_details_options?:OrderDetailsOptionsModel[]

    static get tableName() {
      return 'order_details';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        order_details_options: {
            relation: Model.HasManyRelation,
            modelClass: OrderDetailsOptionsModel,
            join: {
              from: 'order_details.id',
              to: 'order_details_options.order_detailsId'
            }
          }
        ,
        
        orders: {
          relation: Model.BelongsToOneRelation,
          modelClass: OrdersModel,
          join: {
            from: 'orders.id',
            to: 'order_details.orderId'
          }
        }
        ,    
            menu_categories_items: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuCategoriesItemsModel,
            join: {
              from: 'menu_categories_items.id',
              to: 'order_details.menu_categories_itemId'
            }
          }
      };
    }
  }