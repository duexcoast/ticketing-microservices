import React from 'react';
import Link from 'next/link';
import SecondaryBtn from './ui/secondary-btn';
import PrimaryBtn from './ui/primary-btn';
import MobileMenu from './ui/mobile-menu';
import HeaderLink from './ui/HeaderLink';
import HeaderLinkDiv from './ui/HeaderLinkDiv';

export default function Header({ currentUser }) {
  const links = [
    { href: '#', label: 'Home', isActive: true },
    { href: '#', label: 'Marketplace', isActive: false },
    { href: '#', label: 'Account', isActive: false },
  ];
  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link href='/'>
            <a className='flex items-center'>
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Automatix
              </span>
            </a>
          </Link>

          <div className='flex items-center lg:order-2'>
            {currentUser ? (
              <SecondaryBtn href='/signout' label='Sign Out' />
            ) : (
              <>
                <SecondaryBtn href='/auth/signin' label='Sign In' />
                <PrimaryBtn href='/auth/signup' label='Sign Up' />
              </>
            )}
            <MobileMenu />
          </div>
          <HeaderLinkDiv>
            {links.map(({ href, label, isActive }) => (
              <HeaderLink href={href} label={label} isActive={isActive} />
            ))}
          </HeaderLinkDiv>
        </div>
      </nav>
    </header>
  );
}
