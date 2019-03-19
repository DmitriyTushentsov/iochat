import React from 'react';
import s from './loginPage.module.css'


const loginPage = (props) => {


    let loginInput = React.createRef();
    const loginSubmit = (e) => {
        e.preventDefault();
        let login = loginInput.current.value;
        if (login) props.dispatch({type: "VERIFY_USER", userName: login});
    };

    let error = <div className={s.error}>{props.state.errors.loginError}</div>;
    return (

        <div className = {s.login}>
            <form onSubmit = {loginSubmit} className={s["login-form"]} >

                <label htmlFor = "username">
                    <h3>Enter your login here</h3>
                </label>
                <input
                    ref = {loginInput}
                    type = "text"
                    id = "username"
                />
                <input value = "Enter" type = "submit"/>

            </form>

            {props.state.errors.loginError && error}
        </div>
    );
};


export default loginPage;