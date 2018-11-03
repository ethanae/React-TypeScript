import * as React from 'react';
import { IUser } from '../interfaces/IUser';

export interface IUserItemState {
  user: { userId: string, userName: string };
  onUserClick(userId: string): void;
}

const UserItem = (props: IUserItemState) => {
  return (
      <a style={{ cursor: 'pointer' }} className="list-group-item list-group-item-action" onClick={e => props.onUserClick(props.user.userId)}>
        {props.user.userName}
      </a>
  )
}

export default UserItem;