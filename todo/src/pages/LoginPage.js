import React from 'react';
import LoginButton from '../components/LoginButton'
import InputFields from '../components/InputFields'
import styles from './LoginPage.module.css'
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Toast from '../components/Toaster';
// import { useLocation } from 'react-router-dom'

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState(null)
    const [toastType, setToastType] = useState(null)
    const fromPath = '/login'
    // const location = useLocation();

    useEffect(()=> {
        const params = new URLSearchParams(window.location.search)
        const type = params.get('type')
        const message = params.get('message')
        if (type) setToastType(type)
        if (message) setToastMessage(message)
        if(type || message ) window.history.replaceState({}, '', window.location.pathname)
    },[])

    const { googleLogin , login, isLoading, error } = useAuth();

    const handleLogin = (e) => {

        e.preventDefault();
        login(username, password, fromPath);

       }

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        googleLogin();
    }


    return (
        <div class={styles.loginPage}>
            <h2>Login</h2>

            <div class={styles.inputfields}>
                <InputFields username={username} password={password} onEmailChange={setUsername} onPassChange={setPassword} />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <LoginButton handleLogin={handleLogin} disabled={isLoading} />
                <p className={styles.or}>OR</p>
                <GoogleLoginButton handleGoogleLogin={handleGoogleLogin}/>
            </div>
        {toastMessage && toastType && <Toast message={toastMessage} type={toastType} duration={2000}/>}
        {isLoading && <p>Logging in...</p>}
            
        </div>
    )
}

export default LoginPage;