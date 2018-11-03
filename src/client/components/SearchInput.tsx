import * as React from 'react';

export interface ISearchProps {
  onSearchChange?(e: React.ChangeEvent<any>): any,
  onSearchTrigger?(e: React.MouseEvent<HTMLButtonElement>): any,
  placeholder?: string,
  className?: string
}

const SearchInput = (props: ISearchProps) => {
  return (
      <div className="input-group">
        <input 
          type="search"
          className={props.className}
          placeholder={props.placeholder}
          aria-label={props.placeholder}
          onChange={e => props.onSearchChange(e)} />

        <div className="input-group-append">
          <button 
            onClick={e => props.onSearchTrigger(e)}
            className="btn btn-outline-primary" 
            type="button">
              Search
          </button>
        </div>
      </div>
  )
}

export default SearchInput;