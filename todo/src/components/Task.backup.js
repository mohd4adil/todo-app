import { useState, useEffect } from "react";
import styles from './Task.module.css';
import axios from 'axios';
import Toast from './Toaster'

const ShowTask = ({taskId, closeTask, refreshTask, onDelete}) => {

const [taskToggle, setTaskToggle] = useState(false);
const [taskName, setTaskName] = useState('')
const [taskDescription, setTaskDescription] = useState('')
const [taskStatus, setTaskStatus] = useState('')
const [editState, setEditState] = useState(false)
const [updateStatus, setUpdateStatus] = useState(null)

const updateTask = async() => {
    try {
        console.log('proceeding to update task details')
        console.log('tasks status being sent: ', taskStatus)
        const response = await axios.patch('http://localhost:5000/api/edittask', {
            taskId: taskId,
            taskName: taskName,
            taskDescription: taskDescription,
            status: taskStatus
        },{ withCredentials:true })
        
        if (response) {
            console.log('successfully updated the task')
            setTaskName(response.data.taskName)
            setTaskDescription(response.data.taskDescription)
            setTaskStatus(response.data.status)
            setUpdateStatus('update')
            setTimeout(() => setUpdateStatus(null), 2100)
            refreshTask(taskId)
            closeTask()
        }
    }
    catch(e) {
        console.log('failed to update')
        setUpdateStatus('fail')
        setTimeout(() => setUpdateStatus(null), 2100)
    }
}

useEffect(() => {
    const fetchTask = async() => {
    try {
        console.log('wheeee')
        const response = await axios.get('http://localhost:5000/api/tasks', {
            params: {
                taskId: taskId
            },
            withCredentials: true
        })
        if (response.status === 200 || response.status === 304) {
            setTaskName(response.data.taskDetails.task_name)
            setTaskDescription(response.data.taskDetails.task_description)
            setTaskStatus(response.data.taskDetails.status)
            setTaskToggle(true)
        }
    }
    catch (err) {
        throw new Error('Could not fetch task')
    }}
    if(taskId) {
        fetchTask()
    }

}, [taskId])

return (
    <div className={styles.container}>

        {/* <svg className={styles.toggleButton} onClick={()=> setTaskToggle(!taskToggle)} style={{display: taskToggle ? 'none': 'block'}} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6C63FF">
        <path d="M448.67-280h66.66v-164H680v-66.67H515.33V-680h-66.66v169.33H280V-444h168.67v164Zm31.51 200q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z"/>
        </svg> */}
        <div className={styles.overlay} style={{display: taskToggle? 'flex': 'none'}}>
            <div className={styles.showTaskContainer} style={{display: taskToggle? "block" : "none"}}>
                <div className={styles.exitButtonContainer}>
                    <svg className={styles.exitButton} onClick={()=>{
                        setTaskToggle(!taskToggle);
                        closeTask()
                    }} style={{display: taskToggle ? 'flex' : 'none', cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" 
                    width="24px" fill="#000000">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                    <div className={styles.editDeleteContainer}>
                        {editState? 
                        <svg className={styles.editButton} onClick={updateTask}
                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                        : 
                        <svg className={styles.deleteButton} onClick={onDelete} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>}
                    </div>
                </div>
                <div className={styles.toggleTaskStatus}>
                    <select 
                        className={styles.taskStatus} 
                        value={taskStatus} 
                        onChange={(e) => {
                            setTaskStatus(e.target.value)
                        }}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                {editState? 
                    <div className={styles.taskInfo}>
                        <input id="taskName" className={styles.taskName} type='text' value={taskName}  onChange={(e)=> setTaskName(e.target.value)}/>
                        <textarea id="taskDescription" className={styles.taskDescription} value={taskDescription} onChange={(e)=> setTaskDescription(e.target.value)} /> 
                    </div>  
                :
                    <div className={styles.taskInfo}>
                        <h3 className={styles.taskName} onClick={()=> setEditState(true)}>{taskName}</h3>
                        <p className={styles.taskDescription} onClick={()=> setEditState(true)}>{taskDescription}</p> 
                    </div>  
                } 
                </div>
                </div>
        {updateStatus === 'update' && <Toast message={'Successfully updated the task'} type={'success'} duration={2000} />}
        {updateStatus === 'fail' && <Toast message={'Failed to update the task'} type={'fail'} duration={2000} />}
        {updateStatus === 'delete' && <Toast message={'Successfully deleted the task'} type={'fail'} duration={2000} />}
    </div>


)
}

export default ShowTask;