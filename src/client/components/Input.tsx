import * as React from "react";

export interface IInputProps {
  onInputChange?(e: React.ChangeEvent<any>): any,
}

export class Input extends React.Component<IInputProps, {}> {

  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    return <input 
            placeholder='Search by ID number' 
            className='pa3 ba bg-lightest-blue'
            type="search" 
            onChange={e => this.props.onInputChange(e)}/>;
  }
}