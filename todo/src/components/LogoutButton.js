import React from 'react';
import styles from './LogoutButton.module.css'

const LogoutButton = ({ handleLogout }) => {
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutButton;