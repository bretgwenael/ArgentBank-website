import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../store/authSlice';
import logo from "../../assets/argentBankLogo.png"
import "./header.scss"

function Header() {
  // Sélection des données du store Redux avec useSelector
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Obtention de la fonction dispatch pour déclencher des actions Redux
  const navigate = useNavigate(); // Hook navigate pour la navigation

    // Fonction de gestion de la déconnexion
    const handleSignOut = (event) => {
        event.preventDefault();
        dispatch(logout()); // Dispatch de l'action logout pour déconnecter l'utilisateur
        navigate('/'); // Redirection vers la page d'accueil après déconnexion
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
              <li><FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /><Link to="/user" className='nav-login'>{user.userName}</Link></li>
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