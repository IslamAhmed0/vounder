import { Model } from "objection";
import DepartmentsModel from "./Departments";
import RestaurantModel from "./RestaurantModel";
import UserGroupModel from "./UserGroup";
import UsersModel from "./Users";


export default  class EnternalNotificationsModel extends Model {

    static get tableName() {
      return 'enternal_notifications';
    }
    static relationMappings = {
      usergroup: {
        relation: Model.BelongsToOneRelation,
        modelClass: DepartmentsModel,

        join: {
          from: 'departments.id',
          to: 'enternal_notifications.department_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,

        join: {
          from: 'users.id',
          to: 'enternal_notifications.user_id'
        }
      },
      
      restuarant: {
        relation: Model.BelongsToOneRelation,
        modelClass: RestaurantModel,

        join: {
          from: 'restaurants.id',
          to: 'enternal_notifications.restuarant_id'
        }
      },
    }
  }