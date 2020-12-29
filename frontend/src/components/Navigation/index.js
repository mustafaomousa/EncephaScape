import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import brain from './brain.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink className="nav-link" to="/stack">Stacks</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/brainfolio">Brainfolio</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink className="nav-link" to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className="navbar">
      <ul className="nav">
        <div className='logo'>
          <li>
            <img id='logo' src={brain} alt='EncephaScape'></img>
          </li>
        </div>
        <div className='links'>
          <li>
            <NavLink className="nav-link" exact to="/">Home</NavLink>
          </li>
          {isLoaded && sessionLinks}
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;