import { Model } from 'objection';
import AreasModel from './Areas';
import BillsModel from './Bills';
import OrdersModel from './OrdersModel';
import RestaurantModel from './RestaurantModel';
import RestaurantsStatusModel from './RestaurantsStatus';
import UsersModel from './Users';
import WorkTimes from './WorkingTimes';

export default class BranchesModel extends Model {
  user!: UsersModel;
  restaurantsId!: number;
  static get tableName() {
    return 'branches';
  }

  static relationMappings = {
    areas: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + '/Areas',
      join: {
        from: 'branches.id',
        through: {
          // persons_movies is the join table.
          from: 'restaurant_areas.branch_id',
          to: 'restaurant_areas.area_id',
        },
        to: 'areas.id',
      },
    },
    orders: {
      relation: Model.HasManyRelation,
      modelClass: OrdersModel,
      join: {
        from: 'branches.id',
        to: 'orders.branch_id',
      },
    },
    branch_Status: {
      relation: Model.BelongsToOneRelation,
      modelClass: RestaurantsStatusModel,
      join: {
        from: 'restaurants_status.id',
        to: 'branches.status_id',
      },
    },
    Bills: {
      relation: Model.HasManyRelation,
      modelClass: BillsModel,
      join: {
        from: 'branches.id',
        to: 'Bills.branch_id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'users.id',
        to: 'branches.user_id',
      },
    },
    restaurant: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/RestaurantModel',
      join: {
        from: 'restaurants.id',
        to: 'branches.restaurantsId',
      },
    },
    worktimes: {
      relation: Model.HasManyRelation,
      modelClass: WorkTimes,
      join: {
        from: 'branches.id',
        to: 'working_times.branchId',
      },
    },
  };
}
