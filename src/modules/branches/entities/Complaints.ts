import { Model } from "objection";
import ComplaintsReplyModel from "./ComplaintsReply";
import UsersModel from "./Users";


export default  class ComplaintsModel extends Model {

    static get tableName() {
      return 'complaints';
    }
    static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
        return {
            complaintsreplies: {
            relation: Model.HasManyRelation,
            // The related model. This can be either a Model
            // subclass constructor or an absolute file path
            // to a module that exports one. We use a model
            // subclass constructor `Animal` here.
            modelClass: ComplaintsReplyModel,
            join: {
              from: 'complaints.id',
              to: 'complaints_replies.complaints_id'
            }
          }
          ,user :{
            relation:Model.BelongsToOneRelation, 
            modelClass:UsersModel,
            join: {
              from: 'users.id',
              to: 'complaints.user_id'
            }
          }
        };
      }
  } 