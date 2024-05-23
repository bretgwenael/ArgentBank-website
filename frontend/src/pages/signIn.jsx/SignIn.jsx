import Form from '../../components/Form/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./signin.scss";

function SignIn() {
    return (
            <main className='main bg-dark'>
                <section className='SignIn__content'>
                <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
                    <h1>Sign In</h1>
                    <Form />
                </section>
            </main>
    )
}

export default SignIn;