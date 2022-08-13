import { Model } from "objection";
import OrdersModel from "./OrdersModel";
import MenuCategoriesItemsModel from "./MenuCategoriesItems";
import MenuOptions from "./MenuOptions";

export default class OrderDetailsOptionsModel extends Model {

    menu_options_id!:number

    static get tableName() {
      return 'order_details_options';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        order_details: {
          relation: Model.BelongsToOneRelation,
          modelClass: OrdersModel,
          join: {
            from: 'order_details_options.id',
            to: 'order_details_options.order_detailsId'
          }
        }
        ,        menu_options: {
            relation: Model.BelongsToOneRelation,
            modelClass: MenuOptions,
            join: {
              from: 'menu_options.id',
              to: 'order_details_options.menu_options_id'
            }
          }
      };
    }
  }