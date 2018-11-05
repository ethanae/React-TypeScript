import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export interface IUserItemState {
  user: { userId: string, userName: string };
  onUserClick(userId: string): void;
  onUserDelete(userId: string): void;
}

const UserItem = (props: IUserItemState) => {
  return (
    <div className="list-group-item list-group-item-action">
      {props.user.userName}
      <button className="btn btn-sm btn-danger float-right ml-2" onClick={e => props.onUserDelete(props.user.userId)} >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <button className="btn btn-sm btn-info float-right" onClick={e => props.onUserClick(props.user.userId)} >
        <FontAwesomeIcon icon={faEye} />
      </button>
    </div>
  )
}

export default UserItem;