import * as React from 'react';
import { IUser } from '../interfaces/IUser';
import UserItem from './UserItem';

export interface IUserListState {
  users: IUser[];
  onUserClick(userId: string): void;
  onUserDelete(userId: string): void;
}

const UserList = (props: IUserListState) => {
  return (
    <div className='list-group shadow'>
      {
        props.users.map(u => {
          return <UserItem 
                    key={u.idNumber} 
                    user={{ userId: u.idNumber, userName: u.firstName + u.lastName }}
                    onUserClick={userId => props.onUserClick(userId)} 
                    onUserDelete={userId => props.onUserDelete(userId)} />
        })
      }
    </div>
  )
}

export default UserList;