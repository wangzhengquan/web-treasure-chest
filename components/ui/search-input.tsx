import React from 'react';
// import {Input} from './input';
import { cn } from "@/lib/utils"

// export interface Mprops extends React.HTMLProps< HTMLElement > {
// }
export interface SearchInptAttributes extends React.InputHTMLAttributes<HTMLInputElement>  {
  // Define the props for your component here
  height?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInptAttributes> = ({ height="37px", ...rest}) => {
  // Implement your component logic here
  return (    
    <label className="relative flex flex-1" style={{height: height}}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
        </svg>
      </span>
      <span className="sr-only">Search</span>
      <input type="text" name="search" 
        className={cn("block bg-input w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400  sm:text-sm",
          "focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
        )} 
        {...rest}/>
    </label>
  );
};

export default SearchInput;