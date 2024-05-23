import logo from "../../assets/argentBankLogo.png"

function Header() {
    

    return (
        <header className="header">
            <div className='logo-container'>
                <img src={logo} alt="Logo ArgentBank" className="logo" />
            </div>
        </header>
    )
}

export default Header;