import React from 'react';

import useForm from './useForm';

import './mainMenu.css'

const LoginForm = (props) => {
    const { values, handleChange, handleSubmit } = useForm(login);

    function login() {
        const { username, password } = values;
        props.login(username, password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="d-flex justify-content-between flex-column" style={{color: 'white', margin: 16}}>
                <div className="form-group">
                    <label>Login</label>
                    <input type="text" className="form-control" name="username" placeholder="Login" onChange={handleChange} value={values.username} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={values.password} />
                </div>
                <div onClick={handleSubmit} className="eightbit-btn">Submit</div>

            </form>
        </div>
    )
}

export default LoginForm;