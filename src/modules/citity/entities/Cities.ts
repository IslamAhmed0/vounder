import { Model } from 'objection';

import TownsModel from './Towns';

export default class CitiesModel extends Model {
  static get tableName() {
    return 'cities';
  }
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    return {
      towns: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: TownsModel,
        join: {
          from: 'cities.id',
          to: 'towns.city_id',
        },
      },
    };
  }
}
