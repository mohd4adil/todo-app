import styles from './TodoList.module.css';  // Fixed import

const TodoList = ({tasks, isLoading, onTaskClick}) => {
    console.log(`tasks length: ${tasks.length}`)
    if (isLoading) {
        return <div></div>
    }
    if (tasks.length > 0) {
    return (
        <div className={styles.mainContainer}>
        <div className={styles['task-container']}>
            <div className={styles['task-header']}>
                <div className={`${styles['task-col']} ${styles['id']}`}>Task ID</div>
                <div className={`${styles['task-col']} ${styles['name']}`}>Task Name</div>
                <div className={`${styles['task-col']} ${styles['description']}`}>Task Description</div>
                <div className={`${styles['task-col']} ${styles['status']}`}>Status</div>
            </div>
            <ul className={styles['task-list']}>
                {tasks.map((task) => ( 
                    <li key={task.task_id} className={styles['task-items']} onClick={() => {
                        onTaskClick(task.task_id)
                        }}>
                        <div className={`${styles['task-col']} ${styles['id']}`}>{task.task_id}</div>
                        <div className={`${styles['task-col']} ${styles['name']}`}>{task.task_name}</div>
                        <div className={`${styles['task-col']} ${styles['description']}`}>{task.task_description}</div>
                        <div className={`${styles['task-col']} ${styles['status']}`}>{task.status}</div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
    }
    else {
        return (
            <div className={`${styles['emptyTodoList']}`}>
                <p className={styles.text}>Nothing to see here</p>
            </div>
        )
    }
};

export default TodoList;