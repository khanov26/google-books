import React from 'react';
import Search from '../Search';
import './styles.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className='header__title'>Search for books</h1>
        <div className="header__search">
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
