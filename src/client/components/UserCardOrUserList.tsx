import * as React from 'react';

import UserList from './UserList';
import UserCard from './UserCard';
import { IUser } from '../interfaces/IUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface IUserCardOrUserListProps {
  showUserCard: boolean;
  activeUser: IUser;
  onUserClose(): void;
  users: IUser[];
  onUserClick(userId: string): void;
  onUserDelete(userId: string): void;
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
      <div className="">
        <button className="btn btn-sm btn-primary float-right" >
            <FontAwesomeIcon icon={faPlus} />
        </button>
        <h2>Users</h2>
      </div>
      <UserList users={props.users} onUserClick={id => props.onUserClick(id)} onUserDelete={id => props.onUserDelete(id)} />
    </div>
  )
}

export default UserCardOrUserList;
