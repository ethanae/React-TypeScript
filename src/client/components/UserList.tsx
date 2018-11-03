import * as React from 'react';
import { IUser } from '../interfaces/IUser';
import UserItem from './UserItem';

export interface IUserListState {
  users: IUser[];
  onUserClick(e: string): void
}

const UserList = (props: IUserListState) => {
  return (
    <div className='list-group shadow'>
      {
        props.users.map(u => {
          return <UserItem key={u.idNumber} user={{ userId: u.idNumber, userName: u.firstName + u.lastName }} onUserClick={e => props.onUserClick(e)} />
        })
      }
    </div>
  )
}

export default UserList;