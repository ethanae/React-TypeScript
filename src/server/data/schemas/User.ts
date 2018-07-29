import { Document, Schema, Model, model, connect } from "mongoose";
import { IUser } from "../../common/interfaces/IUser";

export interface UserEntity extends IUser, Document {}

export const UserSchema: Schema = new Schema({
  idNumber: { type: String, unique: true, required: true, dropDups: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tel: String,
  email: { type: String, unique: true, required: true, dropDups: true },
  address: String
});

connect('');
export const User: Model<UserEntity> = model<UserEntity>('User', UserSchema);