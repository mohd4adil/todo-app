import React from 'react';
import styles from './InputFields.module.css';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputFields = (props) => {

    const {username, password, onEmailChange, onPassChange} = props;
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    } 

    return (
        <div class={styles.inputFields}>
            <p class={styles.labels}>Email or Username</p>
            <input id="email" value={username} class={styles.username} type='email' placeholder="Enter your email address" onChange={(e)=> onEmailChange(e.target.value)}></input>
            <p class={styles.labels}>Password</p>
            <div className={styles.passwordWrapper}>
                <input id="pass" value={password} class={styles.pass} type= {showPassword ? 'text': 'password'} placeholder="Enter your password" onChange={(e) => onPassChange(e.target.value) }></input>
                <span className={styles.toggleIcon} onClick={togglePasswordVisibility}>{ showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/> }</span>
            </div>
        </div>
    )
}

export default InputFields; 