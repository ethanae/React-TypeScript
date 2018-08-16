import * as React from "react";
import { IUser } from "../interfaces/IUser";

export interface ICardProps {
  user: IUser
}

export const UserCard = (props: ICardProps) => {
  return (
    <div className='alert alert-success'>
      <h3>Success!</h3>
      <p>
        <span className='font-weight-bold'>ID Number: </span>
        {props.user.idNumber}
      </p>
      <p>
        <span className='font-weight-bold'>Name: </span>
        {`${props.user.firstName} ${props.user.lastName}`}
      </p>
      <p>
        <span className='font-weight-bold'>Email: </span>
        {props.user.email}
      </p>
      <p>
        <span className='font-weight-bold'>Contact Number: </span>
        {props.user.tel}
      </p>
      <p>
        <span className='font-weight-bold'>Address: </span>
        {props.user.address}
      </p>
    </div>
  );
}