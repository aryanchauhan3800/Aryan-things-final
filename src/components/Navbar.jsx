import React from 'react';
import { Link } from 'react-router-dom';
import { appleImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
      <nav className='flex w-full screen-max-width'>
        <img
          src={appleImg}
          alt="nasa"
          width={90}
          height={190}
        />

        <div className='flex flex-1 justify-center max-sm:hidden pt-4'>
          {navLists.map((nav, index) => (
            <Link
              key={index}
              to={nav.path} 
              className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
