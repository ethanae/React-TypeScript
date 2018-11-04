import * as React from "react";
import { IUser } from "../interfaces/IUser";

export interface ICardProps {
  user: IUser
}

const UserCard = (props: ICardProps) => {
  return (
    <div className='card border shadow'>
     <div className="card-body">
      <h2>
          {`${props.user.firstName} ${props.user.lastName}`}
      </h2>
      <p>
          <span className='font-weight-bold'>ID Number: </span>
          {props.user.idNumber}
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
    </div>
  );
}

export default UserCard;