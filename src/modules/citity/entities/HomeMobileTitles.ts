import { Model } from "objection";


export default  class HomeMobileTitlesModel extends Model {
    title?:string
    static get tableName() {
      return 'home_mobile_titles';
    }

  }