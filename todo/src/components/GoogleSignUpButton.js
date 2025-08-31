import styles from './GoogleLoginButton.module.css'

const GoogleLoginButton = ({handleGoogleSignUp}) => {


    return (
        <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={handleGoogleSignUp}>
            <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg" alt=""></img>
            <span className={styles.loginText}>Sign Up with Google</span>
            </button>
        </div>
    )
}

export default GoogleLoginButton;