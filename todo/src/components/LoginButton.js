import React from 'react';
import styles from './LoginButton.module.css'

const LoginButton = ({ handleLogin }) => {
    return (
        <div>
            <button className={styles.loginButton} onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginButton;