import * as React from "react";

export interface IInputProps {
  onInputChange?(e: React.ChangeEvent<any>): any,
  placeholder?: string,
  className?: string
}

export class Input extends React.Component<IInputProps, {}> {

  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    return <input 
            placeholder={this.props.placeholder} 
            className={this.props.className}
            type="search" 
            onChange={e => this.props.onInputChange(e)}/>;
  }
}