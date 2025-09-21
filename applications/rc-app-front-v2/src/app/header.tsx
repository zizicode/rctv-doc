import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../public/rc-media.png'
import { routerSections } from './mocks/sections';

const Header: React.FC = () => {
  return (
    <header className='navbar'>
      <div className="content-header">
        <div className="logo">
          <img src={logo} alt="rc-media-logo" />
        </div>

        <nav className='nav-header'>
          <ul>
            {
              routerSections.map((sett, i) => (
                <li key={i}>
                  <Link to={sett.path}>{sett.label}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header