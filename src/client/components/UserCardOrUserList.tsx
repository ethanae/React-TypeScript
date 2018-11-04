import * as React from 'react';

import UserList from './UserList';
import UserCard from './UserCard';
import { IUser } from '../interfaces/IUser';

export interface IUserCardOrUserListProps {
  showUserCard: boolean;
  activeUser: IUser;
  onUserClose(): void;
  users: IUser[];
  onUserClick(userId: string): void;
}

const UserCardOrUserList = (props: IUserCardOrUserListProps) => {
  return (
    props.showUserCard ? 
    <div>
      <UserCard user={props.activeUser} />
      <button className='btn btn-danger mt-2 col-12' onClick={_ => props.onUserClose()}>
        Close
      </button>
    </div>
    :
    <div>
      <h2>Users</h2>
      <UserList users={props.users} onUserClick={id => props.onUserClick(id)} />
    </div>
  )
}

export default UserCardOrUserList;
