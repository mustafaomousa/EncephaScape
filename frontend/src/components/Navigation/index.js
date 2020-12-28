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
          <NavLink className="nav-link" to="/stack">Browse Stacks</NavLink>
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
        <li>
          <img id='logo' src={brain} alt='EncephaScape'></img>
        </li>
        <li>
          <NavLink className="nav-link" exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;