import styles from './Toaster.module.css'
import { useState, useEffect } from 'react'

const Toast = ({message, type, duration}) => {

    const [show, setShow] = useState(true)

    useEffect(()=>{
        const timer = setTimeout(()=> {
            setShow(false)
        }, duration)
        return ()=> clearTimeout(timer)
    }, [duration])

    if (!show) {
        return null
    }

    return (
            <div className={`${styles.toaster} ${styles[type]}`}>
                {message}
            </div>
    )
}

export default Toast