import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';

import { UserForm } from "./Forms/UserForm";
import { IUser } from "../interfaces/IUser";
import { ToastContainer, toast } from 'react-toastify';
import SearchInput from './SearchInput';
import UserCardOrUserList from './UserCardOrUserList';
import * as Spinner from 'react-spinkit';

const reactImg = require('../assets/react-logo.png');
const nodeImg = require('../assets/nodejs-logo.png');
const mongoImg = require('../assets/mongo-logo.png');
const tsImg = require('../assets/ts-logo.png');
const bootstrapImg = require('../assets/bootstrap-logo.png');

export interface IAppState {
  activeUser: IUser;
  searchTerm: string;
  showUser: boolean;
  users: IUser[];
  loadingUsers: boolean;
}

export class App extends React.Component<{}, IAppState>  {
  constructor({}) {
    super({});

    this.state = {
      activeUser: {} as IUser,
      searchTerm: '',
      showUser: false,
      users: [],
      loadingUsers: true
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data, loadingUsers: false });
      })
      .catch(_ => toast.error('There was trouble finding users'));
  }

  onUserView = (userIdNumber: string) => {
    const user = this.state.users.find(u => u.idNumber === userIdNumber);
    this.setState({ activeUser: user, showUser: true });
  }

  onSearchChange = (e: React.ChangeEvent<any>) : void => {
    if(e.currentTarget.value.length > 0) 
      this.setState({ searchTerm: e.currentTarget.value});
  }

  onSearchClick = () => {
    const { searchTerm } = this.state;
    if(searchTerm.length) {
      fetch(`/api/user/${searchTerm}`, {
        method: 'GET'
      })
      .then(res => {
        if(res.ok) return res.json();
        return false;
      })
      .then(data => {
        if(data)
          this.setState({ activeUser: data, showUser: true });
        else
          toast.error('User not found');
      });
    }
  }

  //demonstrating async/await
  onDeleteUser = async (userIdNumber: string): Promise<void> => {
    try {
      const result = await fetch('/api/user/' + userIdNumber, {
        method: 'DELETE'
      });
      if(result.ok) {
        const reducedUsers = this.state.users.filter(u => u.idNumber !== userIdNumber);
        this.setState({ users: reducedUsers });
      } else {
        toast.error('Couldn\'t delete that user');
      }
    } catch (error) {
      toast.error('Trouble encountered deleting that user');
    }
  }

  onCloseUserCard = (): void => {
    this.setState({ showUser: false });
  }

  render() {
    return (
      <div className='container-fluid mb-5'>
        <ToastContainer />
        <div className='text-center p-5'>
          <h1 className='mb-5 border-bottom border-primary'>React, TypeScript, and MongoDB</h1>
          <div className='w-75 m-auto'>
            <SearchInput 
              className='form-control'
              placeholder='Search users by ID number'
              onSearchChange={e => this.onSearchChange(e)}
              onSearchTrigger={_ => this.onSearchClick()}
            />
          </div>
        </div>
        <div className='w-50 m-auto pb-3 border-bottom border-primary'>
          {
            this.state.loadingUsers ?
              <div className="d-flex justify-content-center align-content-center p-5">
                <Spinner className="" name="ball-clip-rotate-multiple" color="#00d8ff" fadeIn='none' />
              </div>
              :
              <UserCardOrUserList 
                showUserCard={this.state.showUser}
                activeUser={this.state.activeUser}
                onUserClose={this.onCloseUserCard}
                users={this.state.users}
                onUserClick={id => this.onUserView(id)}
                onUserDelete={id => this.onDeleteUser(id)}
              />  
          }        
        </div>

        <div className="row">
          <div className="col-lg-12 text-center pt-3">Made with:</div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <img className="rounded-circle p-1 m-1 border"src={reactImg} width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border" src={tsImg} width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border" src={nodeImg} width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border" src={mongoImg} width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border" src={bootstrapImg} width="50" height="50"/>
          </div>
        </div>
      </div>
    );
  }
}
