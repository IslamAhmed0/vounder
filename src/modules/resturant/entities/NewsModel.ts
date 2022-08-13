import { Model } from "objection";


export default  class NewsModel extends Model {

    static get tableName() {
      return 'news';
    }

  }