import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../store/authSlice';
import logo from "../../assets/argentBankLogo.png"
import "./header.scss"

function Header() {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = (event) => {
        event.preventDefault();
        dispatch(logout());
        navigate('/');
      };

    return (
        <header className="header">
      <div className='logo-container'>
        <Link to="/" aria-label="Go to home page">
          <img src={logo} alt="ArgentBank Logo" className="logo" />
        </Link>
      </div>
      <nav className='nav' aria-label="Main navigation">
        <ul>
          {token ? (
            <>
              <li><FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /><Link to="" className='nav-login'>{user.userName}</Link></li>
              <li><FontAwesomeIcon icon={faArrowRightFromBracket} /><Link onClick={handleSignOut} className='nav-logout'>Sign Out</Link></li>
            </>
          ) : (
            <li><FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /><Link to="/signIn" className='nav-login'>Sign In</Link></li>
          )}
        </ul>
      </nav>
    </header>
    )
}

export default Header;