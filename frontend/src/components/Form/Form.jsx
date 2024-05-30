import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";


import "./form.scss";

function Form() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault()
        dispatch(signup({email, password}))
        .then((res) => {
            setEmail('');
            setPassword('')
            navigate('/user');
        })
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="input-wrapper">
                <label htmlFor="email">email</label>
                <input
                    type="text"
                    id="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    
                />
            </div>
            <div className="checkbox-wrapper">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
            
        </form>
    );
}

export default Form;