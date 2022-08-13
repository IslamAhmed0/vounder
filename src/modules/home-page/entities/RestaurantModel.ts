import { Model } from "objection";
import BranchesModel from "./BranchModel";
import Categories from "./Categories";
import DepartmentsModel from "./Departments";
import FavortiesModel from "./Favorites";
import MenuCategoriesModel from "./MenuCategories";
import OffersModel from "./OffersModel";
import OrdersModel from "./OrdersModel";
import RatesModel from "./RatesModel";
import RefuseApproveReasonsModel from "./RefuseApproveReasons";
import restaurantApprovalAssginemtModel from "./restaurantApprovalAssginemt";
import RestaurantsStatusModel from "./RestaurantsStatus";
import RestaurantsTypes from "./RestaurantsTypes";
import restaurant_attachmentsModel from "./ResturantAttachment";
import TownsModel from "./Towns";
import UsersModel from "./Users";



export default class RestaurantModel extends Model {
  id!:            number;
  name!:          string;
  name_en!:       string;
  logo!:          string;
  cover!:         string;
  minimum!:       number;
  delivery_time!: number;
  taxes!:         number;
  created!:       Date;
  modified!:      Date;
  navigationId!:number;license_number!:string;taxes_number!:string;
  restaurant_attachments!:restaurant_attachmentsModel
  user!:UsersModel
  socket_id?:UsersModel
category_id?:number
discount_percentage?:number
discount_to?:string
    static get tableName() {
      return 'restaurants';
    }
    static get relationMappings() {
      // Importing models here is a one way to avoid require loops.
  
   
      return {
        branches: {
          relation: Model.HasManyRelation,
          modelClass: BranchesModel,
          join: {
            from: 'restaurants.id',
            to: 'branches.restaurantsId'
          }
        },
        
          offers: {
            relation: Model.HasManyRelation,
            modelClass: OffersModel,
            join: {
                from: 'restaurants.id',
              to: 'offers.restaurant_id'
            }
          },
        restaurant_attachments: {
          relation: Model.HasOneRelation,
          modelClass: restaurant_attachmentsModel,
          join: {
            from: 'restaurants.id',
            to: 'restaurant_attachments.restaurant_id'
          }
        },
        favourites: {
          relation: Model.HasManyRelation,
          modelClass: FavortiesModel,
          join: {
            from: 'restaurants.id',
            to: 'favourites.restaurant_id'
          }
        }  
        ,RestaurantTypes :{
          relation:Model.BelongsToOneRelation,
          modelClass:RestaurantsTypes,
          join: {
            from: 'restaurants_types.id',
            to: 'restaurants.restaurants_types_id'
          } 
        },Department :{
          relation:Model.BelongsToOneRelation,
          modelClass:DepartmentsModel,
          join: {
            from: 'departments.id',
            to: 'restaurants.departments_id'
          }
        }
        ,Sales_Employee :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'restaurants.sales_id'
          }
        }
        ,Account_Manager :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'restaurants.account_manager_id'
          }
        }
        ,Content_Employee :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'restaurants.content_id'
          }
        }
        ,refuseReason :{
          relation:Model.BelongsToOneRelation,
          modelClass:RefuseApproveReasonsModel,
          join: {
            from: 'refuse_approve_reasons.id',
            to: 'restaurants.refuse_approve_reasons_id'
          }
        }
        ,RestaurantStatus :{
          relation:Model.BelongsToOneRelation,
          modelClass:RestaurantsStatusModel,
          join: {
            from: 'restaurants_status.id',
            to: 'restaurants.restaurants_status_id'
          }
        }
        ,category :{
          relation:Model.BelongsToOneRelation,
          modelClass:Categories,
          join: {
            from: 'categories.id',
            to: 'restaurants.category_id'
          }
        }
        ,user :{
          relation:Model.BelongsToOneRelation,
          modelClass:UsersModel,
          join: {
            from: 'users.id',
            to: 'restaurants.user_id'
          }
        },
        menu_categories: {
          relation: Model.HasManyRelation,
          modelClass: MenuCategoriesModel,
          join: {
            from: 'restaurants.id',
            to: 'menu_categories.restaurant_id'
          }
        },
          towns: {
            relation: Model.HasManyRelation,
            modelClass: TownsModel,
            join: {
              from: 'cities.id',
              to: 'towns.city_id'
            }
          }
        ,cuisines :{
            relation: Model.ManyToManyRelation,
            modelClass: __dirname + '/CuisinesModel',
            join: {
              from: 'restaurants.id',
              through: {
                from: 'restaurant_cuisine.restaurant_id',
                to: 'restaurant_cuisine.cuisine_id'
              },
              to: 'cuisines.id'
            }
        },
        rates: {
          relation: Model.HasManyRelation,
          modelClass: RatesModel,
          join: {
              from: 'restaurants.id',
            to: 'rates.restaurant_id'
          }
        }
        ,
        restaurant_approval_assginemt: {
          relation: Model.HasOneRelation,
          modelClass: restaurantApprovalAssginemtModel,
          join: {
              from: 'restaurants.id',
            to: 'restaurant_approval_assginemt.restaurant_id'
          }
        } 
      };
    }
  }
  
  