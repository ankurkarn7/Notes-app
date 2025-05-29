import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbarc.css';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <NavLink to='/'>
        Home
      </NavLink>
      <NavLink to='/pastes'>
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
