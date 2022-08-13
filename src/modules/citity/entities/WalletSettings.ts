import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import TransactionsModel from "./Transactions";
import UsersModel from "./Users";
import WalletTypesModel from "./WalletTypes";


export default class walletSettingsModel extends Model {

    static get tableName() {
      return 'walletSettings';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
       wallettype :{
          relation:Model.BelongsToOneRelation,
          modelClass:WalletTypesModel,
          join: {
            from: 'wallettypes.id',
            to: 'walletSettings.wallet_type_id'
          }
        }
      };
    }
  }