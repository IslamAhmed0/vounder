import { Model } from "objection";
import Categories from "./Categories";

export default class CuisinesModel extends Model {

    static get tableName() {
        return 'cuisines';
      }

      static relationMappings = {
        categories: {
          relation: Model.HasOneRelation,
          modelClass: Categories,
          join: {
            from: 'categories.id',
            to: 'cuisines.category_id'
          }
        },
        restaurants: {
          relation: Model.ManyToManyRelation,
          modelClass: __dirname + '/RestaurantModel',
          join: {
            from: 'cuisines.id',
            through: {
              // persons_movies is the join table.
              from: 'restaurant_cuisine.cuisine_id',
              to: 'restaurant_cuisine.restaurant_id'
            },
            to: 'restaurants.id'
          }
        }
    }
}