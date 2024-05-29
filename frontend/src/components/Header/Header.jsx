import { Link } from 'react-router-dom';
import logo from "../../assets/argentBankLogo.png"
import "./header.scss"

function Header() {
    

    return (
        <header className="header">
            <div className='logo-container'>
                <img src={logo} alt="Logo ArgentBank" className="logo" />
            </div>
            <nav className='nav'>
        <ul>
             
            <li><Link to="/" >Sign In</Link></li>

            <li><Link to="/signin">Sign Out</Link></li>
          
        </ul>
      </nav>
        </header>
    )
}

export default Header;