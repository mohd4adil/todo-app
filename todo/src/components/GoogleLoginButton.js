import styles from './GoogleLoginButton.module.css'

const GoogleLoginButton = ({handleGoogleLogin}) => {


    return (
        <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={handleGoogleLogin}>
            <img src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg" alt=""></img>
            <span className={styles.loginText}>Login with Google</span>
            </button>
        </div>
    )
}

export default GoogleLoginButton;