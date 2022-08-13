import * as Dotenv from 'dotenv';
import * as path from 'path';
Dotenv.config({ path: '../../.env' });

import { Logger } from '@nestjs/common';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'mysql2',
    connection: 'mysql://satafood:SyTtW5eE.*_Fj(D[@78.46.76.133:3306/satafood',
    acquireConnectionTimeout: 60000,
  },
  staging: {
    client: 'mysql2',
    connection: {
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
    ...knexSnakeCaseMappers(),
  },
  production: {
    client: 'mysql2',
    connection: {
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
    ...knexSnakeCaseMappers(),
  },
}[process.env.NODE_ENV || 'development'];

Logger.log(
  `Will connect to mysql://${process.env.MYSQL_HOST}@${process.env.MYSQL_USER}/${process.env.MYSQL_DB}`,
);
