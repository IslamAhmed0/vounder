import { Model } from 'objection';
import BillingAddressModel from './Address';
import BranchesModel from './BranchModel';
import DriversModel from './DeliversModel';
import OffersModel from './OffersModel';
import OrderDetailsModel from './OrderDetails';
import OrderStatus from './OrderStatus';
import PaymentTypesModel from './PaymentTypes';
import RestaurantModel from './RestaurantModel';
import UsersModel from './Users';
import WalletModel from './Wallets';

export default class OrdersModel extends Model {
  id!: number;
  first_name!: string;
  address!: string;
  floor_number!: number;
  apartment_number!: number;
  notes!: string;
  latitude!: number;
  longitude!: number;
  user_id!: number;
  area_id!: number;
  restaurant_id!: number;
  order_details?: OrderDetailsModel[];
  order_status_id?: number;
  static get tableName() {
    return 'orders';
  }
  static modifiers = {
    filterRestaurants(query: any, BranchId: any) {
      query
        .where('branch_id', BranchId)
        .andWhere('orders.test_orders', 0)
        .andWhere('orders.order_status_id', 4);
    },
    filterForVendor(query: any, VendorId: any) {
      query
        .joinRelated('[branches]')
        .where('branches.restaurantsId', VendorId)
        .andWhere('orders.test_orders', 0);
    },
  };
  static relationMappings = {
    branches: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/BranchModel',

      join: {
        from: 'branches.id',
        to: 'orders.branch_id',
      },
    },
    paymenttype: {
      relation: Model.BelongsToOneRelation,
      modelClass: PaymentTypesModel,
      join: {
        from: 'paymenttypes.id',
        to: 'orders.paymenttype_id',
      },
    },
    order_details: {
      relation: Model.HasManyRelation,
      modelClass: OrderDetailsModel,
      join: {
        from: 'orders.id',
        to: 'order_details.orderId',
      },
    },
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'users.id',
        to: 'orders.user_id',
      },
    },
    driver: {
      relation: Model.HasOneRelation,
      modelClass: DriversModel,
      join: {
        from: 'orders.id',
        to: 'orders.delivery_id',
      },
    },
    offers: {
      relation: Model.BelongsToOneRelation,
      modelClass: OffersModel,
      join: {
        from: 'offers.id',
        to: 'orders.offer_id',
      },
    },
    wallets: {
      relation: Model.BelongsToOneRelation,
      modelClass: WalletModel,
      join: {
        from: 'wallets.id',
        to: 'orders.wallets_id',
      },
    },
    drivers: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,
      join: {
        from: 'users.id',
        to: 'orders.delivery_id',
      },
    },
    billing_address: {
      relation: Model.BelongsToOneRelation,
      modelClass: BillingAddressModel,
      join: {
        from: 'billing_address.id',
        to: 'orders.billing_address_id',
      },
    },
    order_status: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderStatus,
      join: {
        from: 'order_status.id',
        to: 'orders.order_status_id',
      },
    },
  };
}
