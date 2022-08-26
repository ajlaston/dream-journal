import React from "react";
import { DContext } from "../DreamContext";
import './Auth.css';

function Auth() {

    const {login, signup, errMsg, resetAuthError} = React.useContext(DContext);

    const [formData, setformData] = React.useState({
        username: "",
        password: ""
    })

    const [toggle, setToggle] = React.useState(false);

    //toggle form
    const toggleForm = () => {
        setToggle(prev => !prev);
        resetAuthError();
    }

    //updates formdata on input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setformData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignup = (e) => {
        e.preventDefault();
        signup(formData);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <div className="auth">
            <h1 className="auth-title">Dream Journal</h1>
            <div className="auth-form-wrapper">
                {

                    toggle ?

                        <div className="signup">
                            <h3>Sign Up</h3>
                            <form className="auth-form" onSubmit={handleSignup}>
                                <input name="username" onChange={handleChange} value={formData.username} placeholder="Username" required />
                                <input name="password" onChange={handleChange} value={formData.password} placeholder="Password" required />
                                <button>register</button>
                            </form>
                            <p style={{ color: 'red', marginTop: '20px', marginBottom : '0px' }}>{errMsg}</p>
                            <button className="toggle-btn" onClick={toggleForm}>Already have an account?</button>
                        </div>
                        :

                        <div className="login">
                            <h3>Log In</h3>
                            <form className="auth-form" onSubmit={handleLogin}>
                                <input name="username" onChange={handleChange} value={formData.username} placeholder="Username" required />
                                <input name="password" onChange={handleChange} value={formData.password} placeholder="Password" required />
                                <button>login</button>
                            </form>
                            <p style={{ color: 'red', marginTop: '20px', marginBottom : '0px' }}>{errMsg}</p>
                            <button className="toggle-btn" onClick={toggleForm}>Dont have an account?</button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Auth;