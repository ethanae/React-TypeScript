import * as React from 'react';

import UserList from './UserList';
import UserCard from './UserCard';
import { UserForm } from "../components/Forms/UserForm";
import { IUser } from '../interfaces/IUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';

export interface IUsersSectionProps {
  activeUser: IUser;
  users: IUser[];
  onUserDelete(userId: string): void;
}

export interface IUsersSectionState {
  activeUser: IUser;
  showUser: boolean;
  addUser: boolean;
  showUserForm: boolean;
}

class UsersSection extends React.Component<IUsersSectionProps, IUsersSectionState> {
  constructor(props: IUsersSectionProps) {
    super(props);

    this.state = {
      activeUser: {} as IUser,
      addUser: false,
      showUser: false,
      showUserForm: false
    }
  }

  onShowUserCard = (userIdNumber: string) => {
    const user = this.props.users.find(u => u.idNumber === userIdNumber);
    this.setState({ activeUser: user, showUser: true });
  }

  onCloseUserCard = (): void => {
    this.setState({ showUser: false });
  }

  onToggleUserForm = () => this.setState({ showUserForm: !this.state.showUserForm });

  render() {
    if(this.state.showUserForm) {
      return (
        <div className="shadow p-3">
          <div>
            <button className="btn btn-sm btn-danger float-right" onClick={() => this.onToggleUserForm()}>
              <FontAwesomeIcon icon={faWindowClose} />
            </button>
            <h2>Add new user</h2>
          </div>
          <UserForm />
        </div>
      )
    }

    return (
      this.state.showUser ?
        <div>
          <UserCard user={this.state.activeUser} />
          <button className='btn btn-danger mt-2 col-12' onClick={_ => this.onCloseUserCard()}>
            Close
          </button>
        </div>
        :
        <div>
          <button className="btn btn-sm btn-primary float-right" onClick={() => this.onToggleUserForm()}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <h2>Users</h2>
          <UserList users={this.props.users} onUserClick={id => this.onShowUserCard(id)} onUserDelete={id => this.props.onUserDelete(id)} />
        </div>
    )
  }
}

export default UsersSection;
