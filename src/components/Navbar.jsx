import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbarc.css';
import { useTheme } from '../utils/useTheme';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className='navbar'>
      <NavLink to='/' className='brand'>
        <span className='brand-mark'>✺</span>
        <span className='brand-name'>Notes</span>
      </NavLink>

      <nav className='nav-links'>
        <NavLink to='/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
          New
        </NavLink>
        <NavLink to='/pastes' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          My Notes
        </NavLink>
      </nav>

      <button
        className='theme-toggle'
        onClick={toggleTheme}
        aria-label='Toggle theme'
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}

export default Navbar
