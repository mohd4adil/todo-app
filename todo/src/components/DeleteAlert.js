import styles from './DeleteAlert.module.css'

const DeleteBox = ({ deleteTask, onClose }) => {

        return (
            
            <div className={styles.deleteContainer}>
                <div className={styles.overlay}>
                <div className={styles.deleteBox}>
                    <h3 className={styles.deleteText}>Are you sure you want to delete this task?</h3>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={onClose}>Cancel</button>
                        <button className={styles.button} onClick={()=> {
                            onClose()
                            deleteTask()
                        }}>Delete</button>
                    </div>
                </div>
                </div>
            </div>
            )
}

export default DeleteBox