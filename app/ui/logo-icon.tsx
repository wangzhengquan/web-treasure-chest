import React from 'react';
import clsx from 'clsx';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface Props {
  // Define the props for your component here
  className: string;
}

const MyComponent: React.FC<Props> = ({ className }) => {
  // Implement your component logic here
  return (
    <GlobeAltIcon
      className={clsx('rotate-[15deg] text-blue-600/100 ', className, {})}
    />
  );
};

export default MyComponent;
