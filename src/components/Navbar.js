import React, { useState, useEffect, useContext } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';  // Import the AuthContext
import RegistrationModal from './RegistrationModal';
import './Components_css/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const auth = useContext(AuthContext);  // Access authentication context

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);

    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <span className='navbar-logo-text'>URobotics</span>
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/events' className='nav-links' onClick={closeMobileMenu}>
                Events
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
          </ul>
          {auth.isLoggedIn ? (
            <>
              <span className='navbar-username'>{auth.username}</span>
              <Button buttonStyle='btn--outline' onClick={auth.logout}>
                LOGOUT
              </Button>
            </>
          ) : (
            button && (
              <Button buttonStyle='btn--outline' onClick={openModalHandler}>
                SIGN UP
              </Button>
            )
          )}
        </div>
      </nav>
      <RegistrationModal show={showModal} onClose={closeModalHandler} isHomePage={true} />
    </>
  );
}

export default Navbar;
