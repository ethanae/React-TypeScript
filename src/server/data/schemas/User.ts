import { Document, Schema, Model, model, connect } from "mongoose";
import { IUser } from "../../common/interfaces/IUser";
require('dotenv').config();

let dbConnection;
let collectionName;

export interface UserEntity extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  idNumber: { type: String, unique: true, required: true, dropDups: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tel: String,
  email: { type: String, unique: true, required: true, dropDups: true },
  address: String
});

try {
  dbConnection = process.env.DB_CONN_STRING;
  collectionName = process.env.COLL_NAME;
  if(!dbConnection || !collectionName) {
    throw new Error('Cannot connect to MongoDB. Ensure your connection string and collection name are correctly present in your .env file');
  }
  connect(dbConnection, { useNewUrlParser: true });
} catch (error) {
  throw error;
}
export const User: Model<UserEntity> = model<UserEntity>('User', UserSchema, collectionName);