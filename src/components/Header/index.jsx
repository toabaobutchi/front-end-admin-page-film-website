import HeaderLogo from './HeaderLogo'
import './Header.scss'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='content header'>
      <div className='header-left'>
        <HeaderLogo primaryTitle='Xnxx.com' secondaryTitle='Admin page' />

        <div className='header-menu'>
          <NavLink to='/movies' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            Movies
          </NavLink>
          <NavLink to='/rooms' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            Rooms
          </NavLink>
          <NavLink to='/categories' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
            Categories
          </NavLink>
        </div>
      </div>

      <div className='header-right'>
        <div className='header-user'>
          <div className='header-user-info'>
            <div className='header-user-name'>Nguyễn Văn A</div>
            <div className='header-user-role'>Admin</div>
          </div>

          <img src='https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg' alt='avatar' />

          <div className='header-user-menu'>
            <Link to='/'>
              <i className='fas fa-user-circle'></i> Profile{' '}
            </Link>
            <Link to='/'>
              <i className='fas fa-sign-out-alt'></i> Logout{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
