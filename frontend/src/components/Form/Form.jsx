import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/UserSlice";

import "./form.scss";

function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        const userCredentials = { email, password };
        const response = await fetch(`http://localhost:3001/api/v1/user/login`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email:"tony@stark.com", password:"password123"})
        })
        console.log(response);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            localStorage.setItem("token", data.body.token);
            navigate('/user');
        }
        dispatch(userLogin("user"));


        // Dispatch login action
        /*dispatch(loginUser(userCredentials)).then((result) => {
            console.log(result);
            // Verif login succes
            if (result.type === 'user/loginUser/fulfilled') {
                // Nettoyage input
                setEmail('');
                setPassword('');
                // navigation vers user
                navigate('/user');
            } else {
                // gerer erreur login si necessaire
                console.error('Login failed:', result.error);
            }
        }); */
    }

    return (
        <form onSubmit={handleLoginEvent}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="checkbox-wrapper">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
        </form>
    );
}

export default Form;