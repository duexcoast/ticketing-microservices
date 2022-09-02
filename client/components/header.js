import React from 'react';
import HeaderLogo from './ui/header-logo';
import PrimaryBtn from './ui/primary-btn';
import SecondaryBtn from './ui/secondary-btn';
import MobileMenu from './ui/mobile-menu';
import HeaderLink from './ui/header-link';
import HeaderLinkDiv from './ui/header-link-div';

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
          <HeaderLogo />
          <div className='flex items-center lg:order-2'>
            {currentUser ? (
              <SecondaryBtn href='/auth/signout' label='Sign Out' />
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
