import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';



function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img alt='Логотип Mesto' src={headerLogo} className="header__logo" />
      <Switch>
        <Route exact path='/sign-in'>
          <Link className='header__text' to='/sign-up' >
            Регистрация
          </Link>
        </Route>
        <Route exact path='/sign-up'>
          <Link className='header__text' to='/sign-in' >
            Войти
          </Link>
        </Route>
        <Route exact path='/'>
          <ul className='header__profile'>
            <li className='header__email'>{email}</li>
            <Link className="header__text header__text_exit" to='/sign-in' onClick={onSignOut}>Выйти</Link>
          </ul>
        </Route>
      </Switch>
    </header>
  )
}

export default Header


//<li className='header__email'>{email}</li>
//<li className='header__text' onClick={onSignOut}>Выйти</li>
