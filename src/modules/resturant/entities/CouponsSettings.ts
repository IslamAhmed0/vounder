import { Model } from "objection";


export default  class CopounSettingsModel extends Model {
    title?:string
    number_copoun_weekly?:number
    number_copoun_monthly?:number
    number_copoun_quarter?:number
    number_copoun_yearly?:number
    number_of_winners?:number
    min_number_copouns?:number
    static get tableName() {
      return 'Copoun_Settings';
    }

  } 