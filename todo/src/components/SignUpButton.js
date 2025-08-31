import React from 'react';
import styles from './LoginButton.module.css'

const SignUpPage = ({ handleSignUp }) => {
    return (
        <div>
            <button className={styles.loginButton} onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}

export default SignUpPage;