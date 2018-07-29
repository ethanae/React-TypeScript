import { IAddress } from "./IAddress";
import { IContact } from "./IContact";

export interface IUser extends IAddress, IContact {
  idNumber: string,
  firstName: string,
  lastName: string,
}