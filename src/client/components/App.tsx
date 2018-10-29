import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';

import { Input } from "./Input";
import { UserForm } from "./Forms/UserForm";
import { UserCard } from "./UserCard";
import { IUser } from "../interfaces/IUser";
import { Button } from "./Button";
import { ToastContainer, toast } from 'react-toastify';

const reactImg = require('../assets/react-logo.png');
const nodeImg = require('../assets/nodejs-logo.png');
const mongoImg = require('../assets/mongo-logo.png');
const tsImg = require('../assets/ts-logo.png');

interface IAppState {
  user: IUser,
  searchTerm: string,
  showUser: boolean
}

export class App extends React.Component<{}, IAppState>  {
  constructor({}) {
    super({});

    this.state = {
      user: {} as IUser,
      searchTerm: '',
      showUser: false
    }
  }

  onSearchChange = (e: React.ChangeEvent<any>) : void => {
    if(e.currentTarget.value.length > 0) 
      this.setState({ searchTerm: e.currentTarget.value});
  }

  onSearchClick = () => {
    const { searchTerm } = this.state;
    if(searchTerm.length) {
      fetch(`/api/user/id/${searchTerm}`, {
        method: 'GET'
      })
      .then(res => {
        if(res.ok) return res.json();
        return false;
      })
      .then(data => {
        if(data)
          this.setState({ user: data, showUser: true });
        else
          toast.error('We couldn\'t find that user :(');
      });
    }
  }

  dismissUserCard = (): void => {
    this.setState({ showUser: false });
  }

  render() {
    return (
      <div className='container-fluid mb-5'>
        <ToastContainer />
        <div className='text-center p-5'>
          <h1 className='mb-5 border-bottom border-primary'>User Create and Lookup</h1>
          <div className='row'>
            <div className='col'/>
            <Input className='form-control col-6' placeholder='Search users by ID number' onInputChange={e => this.onSearchChange(e)} />
            <Button className='btn btn-info col-2 ml-2' text='Search' onClick={e => this.onSearchClick()}/>
            <div className='col'/>
          </div>
        </div>
        <div className='w-50 m-auto pb-3 border-bottom border-primary'>
          {
            !this.state.showUser ?
              <UserForm /> :
              (
                <div>
                  <UserCard user={this.state.user} />
                  <Button text='Back' className='btn btn-danger' onClick={e => this.dismissUserCard()} />
                </div>
              )
          }
        </div>
        <div className="row">
          <div className="col-lg-12 text-center pt-3">Made with:</div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <img className="rounded-circle p-1 m-1 border border-primary" src={reactImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-primary" src={tsImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-success" src={nodeImg} alt="" width="50" height="50"/>
            <img className="rounded-circle p-1 m-1 border border-success" src={mongoImg} alt="" width="50" height="50"/>
          </div>
        </div>
      </div>
    );
  }
}
