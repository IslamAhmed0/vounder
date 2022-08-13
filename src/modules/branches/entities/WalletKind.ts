import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import WalletModel from "./Wallets";
import WalletTypesModel from "./WalletTypes";


export default class WalletKindsModel extends Model {

    static get tableName() {
      return 'wallet_kinds';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
       wallet :{
          relation:Model.HasOneRelation,
          modelClass:WalletModel,
          join: {
            from: 'wallet_kinds.id',
            to: 'wallets.wallet_kind_id'
          }
        }
      };
    }
  }