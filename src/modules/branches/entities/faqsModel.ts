import { Model } from "objection";



export default class FaqModel extends Model {

    static get tableName() {
        return 'faqs';
      }
  
}