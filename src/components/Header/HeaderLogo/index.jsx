import logo from '../../../assets/images/logo.png'
function HeaderLogo({ primaryTitle, secondaryTitle }) {
  return (
    <div className='header-logo'>
      <img src={logo} alt='logo' />
      <div className='header-logo-text'>
        <h1 className='header-logo-text-primary'>{primaryTitle}</h1>
        <p className='header-logo-text-secondary'>{secondaryTitle}</p>
      </div>
    </div>
  );
}

export default HeaderLogo;