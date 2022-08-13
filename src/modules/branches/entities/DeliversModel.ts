import { Model } from "objection";
import BranchesModel from "./BranchModel";
import DeliveryAttachmentsModel from "./DeliveryAttachments";
import UsersModel from "./Users";



export default class DriversModel extends Model {

  id?:number
  
  
      static get tableName() {
        return 'delivers';
      }
      static get relationMappings() {
        // Importing models here is a one way to avoid require loops.
    
    
        return {
          branches: {
            relation: Model.BelongsToOneRelation,
            modelClass: BranchesModel,
            join: {
              from: 'branches.id',
              to: 'delivers.branch_id'
            }
          }
          
          ,user :{
            relation:Model.BelongsToOneRelation,
            modelClass:UsersModel,
            join: {
              from: 'users.id',
              to: 'delivers.user_id'
            }
          }
          , attachments :{
            relation:Model.HasManyRelation,
            modelClass:DeliveryAttachmentsModel,
            join: {
              from: 'delivers.id',
              to: 'delivery_attachments.delivery_id'
            }
          }
        }


    }
    }
    
    