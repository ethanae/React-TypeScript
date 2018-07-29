import * as React from "react";

export interface IClickableProps {
  type?: string,
  onClick?(e: React.MouseEvent<HTMLButtonElement>): any,
  text: string,
  className?: string
}

export const Button = (props: IClickableProps) => {
  return (
    <button type="button" className={props.className} onClick={e => props.onClick(e)}>{props.text}</button>
  );
}