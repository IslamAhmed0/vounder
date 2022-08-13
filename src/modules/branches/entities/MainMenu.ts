import { Model } from 'objection';
import UserGroupModel from './UserGroup';

export default class MainMenuModel extends Model {
  static get tableName() {
    return 'main_menu';
  }
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    return {
      submenu: {
        relation: Model.HasManyRelation,
        modelClass: MainMenuModel,
        join: {
          from: 'main_menu.id',
          to: 'main_menu.sub',
        },
      },
      roles: {
        relation: Model.HasManyRelation,
        modelClass: UserGroupModel,
        join: {
          from: 'user_groups.id',
          to: 'main_menu.role',
        },
      },
    };
  }
}
