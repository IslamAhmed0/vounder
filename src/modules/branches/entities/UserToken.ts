import { Model } from "objection";

export default class  UserTokensModel extends Model {
token?:string
    static get tableName() {
      return 'user_tokens';
    }

  }