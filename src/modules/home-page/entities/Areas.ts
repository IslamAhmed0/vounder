import { Model } from "objection";
import BranchesModel from "./BranchModel";
import TownsModel from "./Towns";

export default class AreasModel extends Model {
    branches?: any[]

    static get tableName() {
      return 'areas';
    }
    static relationMappings = {
        branches: {
          relation: Model.ManyToManyRelation,
          modelClass: BranchesModel,
          join: {
            from: 'areas.id',
            through: {
              // persons_movies is the join table.
              from: 'restaurant_areas.area_id',
              to: 'restaurant_areas.branch_id'
            },
            to: 'branches.id'
          }
        },towns :{
          relation:Model.BelongsToOneRelation,
          modelClass:TownsModel,
          join: {
            from: 'towns.id',
            to: 'areas.town_id'
          }
        }
      };
  }