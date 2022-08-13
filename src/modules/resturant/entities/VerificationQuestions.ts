import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";
import WalletTypesModel from "./WalletTypes";


export default class VerificationQuestionsModel extends Model {

    static get tableName() {
      return 'verification_questions';
    }
 
  }