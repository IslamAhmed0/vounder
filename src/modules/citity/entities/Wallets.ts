import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import TransactionsModel from "./Transactions";
import UsersModel from "./Users";
import walletSettingsModel from "./WalletSettings";
import WalletTypesModel from "./WalletTypes";


export default class WalletModel extends Model {

    static get tableName() {
      return 'wallets';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {

        walletSettings :{
          relation:Model.HasManyRelation,
          modelClass:walletSettingsModel,
          join: {
            from: 'wallets.id',
            to: 'walletSettings.wallet_type_id'
          }
        },
       wallettype :{
          relation:Model.BelongsToOneRelation,
          modelClass:WalletTypesModel,
          join: {
            from: 'wallettypes.id',
            to: 'wallets.wallet_type_id'
          }
        },
        areas :{
          relation:Model.BelongsToOneRelation,
          modelClass:AreasModel,
          join: {
            from: 'areas.id',
            to: 'wallets.area_id'
          }
        }
        ,
        createdBy :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'wallets.created_by'
          }
        }
        ,
        restaurants: {
          relation: Model.BelongsToOneRelation,
          modelClass: __dirname + '/RestaurantModel',
          join: {
            from: 'restaurants.id',
            to: 'wallets.restaurant_id'
          }
        },
        users :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'wallets.user_id'
          }
        },
        transaction: {
          relation: Model.HasManyRelation,
          modelClass: TransactionsModel,
          join: {
            from: 'wallets.id',
            to: 'transactions.wallet_id'
          }
        }
      };
    }
  }