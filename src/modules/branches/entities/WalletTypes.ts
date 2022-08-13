import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import walletSettingsModel from "./WalletSettings";


export default class WalletTypesModel extends Model {

    static get tableName() {
      return 'wallettypes';
      
    }
 

    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {

        walletSettings :{
          relation:Model.HasManyRelation,
          modelClass:walletSettingsModel,
          join: {
            from: 'wallettypes.id',
            to: 'walletSettings.wallet_type_id'
          }
        },

      }
    }
    }
    