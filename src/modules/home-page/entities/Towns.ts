import { Model } from "objection";
import AreasModel from "./Areas";
import CitiesModel from "./Cities";


export default class TownsModel extends Model {

    static get tableName() {
      return 'towns';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
  
      return {
        areas: {
          relation: Model.HasManyRelation,
          modelClass: AreasModel,
          join: {
            from: 'towns.id',
            to: 'areas.town_id'
          }
        },city :{
          relation:Model.BelongsToOneRelation,
          modelClass:CitiesModel,
          join: {
            from: 'cities.id',
            to: 'towns.city_id'
          }
        }
      };
    }
  }