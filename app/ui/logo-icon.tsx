import React from 'react';
import clsx from 'clsx';
import {
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

interface Props {
  // Define the props for your component here
}

const MyComponent: React.FC<Props> = (props) => {
  // Implement your component logic here
  return (
    <GlobeAltIcon className={clsx("h-8 w-8 rotate-[15deg] text-blue-600/100 group-[.collapsed]:hidden", {})} />
  );
};

export default MyComponent;