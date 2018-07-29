import * as React from "react";
import "tachyons";
import "../styles/core.css";
import { Input } from "./Input";
import { Button } from "./Button";
import { UserForm } from "./Forms/UserForm";

interface IAppState {
  users: Object[],
  searchTerm: string,
  willAddUser: boolean
}

export class App extends React.Component<{}, IAppState>  {
  constructor() {
    super({});

    this.state = {
      users: [],
      searchTerm: '',
      willAddUser: false
    }
  }

  onSearchChange = (e: React.ChangeEvent<any>) : void => {
    this.setState({ searchTerm: e.currentTarget.value });
  }

  onAddUser = (e: React.MouseEvent<HTMLButtonElement>) : void => {
    this.setState({ willAddUser: true });
  }

  displayUserForm = () => {
    if(!this.state.willAddUser)
      return <Button className='f6 dim br3 ba bw2 ph3 pv2 mb2 dib dark-green' text='Create User' onClick={e => this.onAddUser(e)} />
    else
      return (
        <div className='ma3'>
          <UserForm />
        </div>
      );
  }

  componentDidMount() {
    fetch('api/user/id/9308255116087')
    .then(data => {
      return data.json();
    })
    .then(data => console.log(data));
  }

  render() {
    return (
      <div className='tc'>
        <h1>TypeScript and React User I/O</h1>
        <div>
          <Input onInputChange={e => this.onSearchChange(e)} />
        </div>
        <div className='ma3'>
          <UserForm />
        </div>
      </div>
    );
  }
}
