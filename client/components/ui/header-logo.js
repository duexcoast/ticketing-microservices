import React from 'react';
import Link from 'next/link';

export default function HeaderLogo() {
  return (
    <Link href='/'>
      <a className='flex items-center'>
        <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
          Automatix
        </span>
      </a>
    </Link>
  );
}
