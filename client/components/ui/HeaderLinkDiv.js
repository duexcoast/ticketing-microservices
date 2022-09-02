import React, { Children } from 'react';

export default function HeaderLinkDiv({ children }) {
  return (
    <div
      className='hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
      id='mobile-menu-2'
    >
      <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
        {children}
      </ul>
    </div>
  );
}
