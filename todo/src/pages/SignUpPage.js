import React from 'react';
import SignUpButton from '../components/SignUpButton'
import InputFields from '../components/InputFields'
import styles from './LoginPage.module.css'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GoogleSignUpButton from '../components/GoogleSignUpButton';
// import { useLocation } from 'react-router-dom'

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, googleSignUp, isLoading, error } = useAuth();

    const handleSignUp = (e) => {
        console.log('SignUp has been clicked')
        e.preventDefault();
        signUp(username, password)
    }
    const handleGoogleSignUp = (e) => {
        e.preventDefault();
        googleSignUp()
    }

    return (
        <div class={styles.loginPage}>
            <h2>SignUp</h2>

            <div class={styles.inputfields}>
                <InputFields username={username} password={password} onEmailChange={setUsername} onPassChange={setPassword} />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <SignUpButton handleSignUp={handleSignUp} />
                {/* <p className={styles.or}>OR</p> */}
                <GoogleSignUpButton handleGoogleSignUp={handleGoogleSignUp}/>
            </div>
        {isLoading && <p>Logging in...</p>}
            
        </div>
    )
}

export default LoginPage;