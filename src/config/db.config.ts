import { Module, Global } from '@nestjs/common';
import { map } from 'lodash';
import Knex from 'knex';
import { Model } from 'objection'

import * as knexConfig from './knex';
import CuisinesModel from '../modules/citity/entities/CuisinesModel';
import Categories from '../modules/citity/entities/Categories';
import Cities from '../modules/citity/entities/Cities';

const models = [Categories, CuisinesModel, Cities];

const modelProvider = map(models, (model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProvider,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = await Knex(knexConfig);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
