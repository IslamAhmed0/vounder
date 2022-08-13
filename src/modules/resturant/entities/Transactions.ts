import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import OrdersModel from "./OrdersModel";
import PaymentTypesModel from "./PaymentTypes";
import UsersModel from "./Users";
import WalletModel from "./Wallets";
import WalletTypesModel from "./WalletTypes";


export default class TransactionsModel extends Model {

    static get tableName() {
      return 'transactions';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        wallet: {
          relation: Model.BelongsToOneRelation,
          modelClass: WalletModel,
          join: {
            from: 'wallets.id',
            to: 'transactions.wallet_id'
          }
        },user :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'transactions.wallet_id'
          }
        },
        walletType:{
            relation:Model.BelongsToOneRelation,
            modelClass:WalletTypesModel,
            join: {
              from: 'wallettypes.id',
              to: 'transactions.wallet_type_id'
            }
          },
          orders:{
              relation:Model.BelongsToOneRelation,
              modelClass:OrdersModel,
              join: {
                from: 'orders.id',
                to: 'transactions.order_id'
              }
            },
            paymentTypes:{
                relation:Model.BelongsToOneRelation,
                modelClass:PaymentTypesModel,
                join: {
                  from: 'paymenttypes.id',
                  to: 'transactions.payment_type_id'
                }
              }

      };
    }
  }