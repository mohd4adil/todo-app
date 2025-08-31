import { useState, useEffect } from "react";
import styles from './AddTask.module.css';
import axios from 'axios';


const AddTask = ({onTaskAdded}) => {

const [taskToggle, setTaskToggle] = useState(false);
const [taskName, setTaskName] = useState('')
const [taskDescription, setTaskDescription] = useState('')

const createTask = async() => {
    try {
        const response = await axios.post('http://localhost:5000/api/addtask', {
            taskName: taskName,
            taskDescription: taskDescription
        }, {
            withCredentials: true,
        })
        if (response.status === 200 || response.status === 201) {
            console.log('Added the task to the backend successfully');
            setTaskToggle(false);
            setTaskName('');
            setTaskDescription('');
            onTaskAdded();

        }
        else {
            console.log('error')
            throw new Error("Couldn't add the task")
        }
    }
    catch(err) {
        console.log('Facing some error: ', err)
    }
}

return (
    <div className={styles.container}>
        {/* <svg className={styles.toggleButton} onClick={()=> setTaskToggle(!taskToggle)} style={{display: taskToggle ? 'none': 'block'}} 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg> */}

        <svg className={styles.toggleButton} onClick={()=> setTaskToggle(!taskToggle)} style={{display: taskToggle ? 'none': 'block'}} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6C63FF">
        <path d="M448.67-280h66.66v-164H680v-66.67H515.33V-680h-66.66v169.33H280V-444h168.67v164Zm31.51 200q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z"/>
        </svg>
        <div className={styles.overlay} style={{display: taskToggle? 'flex': 'none'}}>
            <div className={styles.addTaskContainer} style={{display: taskToggle? "block" : "none"}}>
                <div className={styles.exitButtonContainer}>
                <svg onClick={()=>{
                    setTaskToggle(!taskToggle);
                    setTaskName('');
                    setTaskDescription('');
                }} style={{display: taskToggle ? 'flex' : 'none', cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" 
                height="24px" viewBox="0 -960 960 960" 
                width="24px" fill="#000000">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
                </div>
                    <h1 className={styles.taskHeader}>Add new task</h1>
                    <input className={styles.taskName} type='text' placeholder="Add new task here.." onChange={(e)=> setTaskName(e.target.value)} value={taskName}></input>
                    <textarea className={styles.taskDescription} type='text' placeholder="Brief about your task here.." onChange={(e)=> setTaskDescription(e.target.value)} value={taskDescription}></textarea>
                    <div className={styles.buttonContainer}>
                        <button className={styles.applyButton} onClick={createTask}>APPLY</button>
                        <button className={styles.cancelButton} onClick={()=>{
                            setTaskToggle(!taskToggle);
                            setTaskName('');
                            setTaskDescription('');
                            }} style={{display: taskToggle ? 'block' : 'none'}} >CANCEL</button>
                    </div>            
                </div>
                </div>
    </div>

)
}

export default AddTask;