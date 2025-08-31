import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AddTask from '../components/AddTask';
import SearchBar from '../components/SearchBar';
import TodoList from '../components/TodoList';
import ShowTask from '../components/Task.backup.js';
import styles from './TodoHome.module.css'
import LogoutButton from '../components/LogoutButton';
import { fetchTasks } from '../services/api'

const TodoHome = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const { logout } = useAuth();
    const [refresh, setRefresh] = useState('')


    const getTodoList = async () => {
        try {
            const response = await fetchTasks()
            if (response.status === 200 && response.data.taskList) {
                console.log('Received all the tasks, here they are: ', response.data.taskList);
                if (Array.isArray(response.data.taskList) && response.data.taskList.length > 0) setTasks(response.data.taskList) 
            }
        } catch (err) {
            console.log('error: ', err);
            throw new Error(err);
        }
    }
    const refreshUpdatedTask = async(taskId) => {
        console.log('refreshing mentioned task with taskId', taskId)
        setRefresh(taskId)
    }

    const deleteTask = async() => {
        console.log('attempting to delete this task ', selectedTaskId)
        try {
            const response = await axios.delete('http://localhost:5000/api/deletetask', {
                params: {
                    taskId: selectedTaskId
                },
                withCredentials: true
            });
            console.log(`response`)
            if(response.status === 204) {
                console.log('successully deleted this task')   
                setTasks(currentTasks => currentTasks.filter(task => task.task_id !== selectedTaskId))
                setSelectedTaskId(null)
            }
        }
        catch(e) {
            console.log('failed to delete the task: ', e)
        }
    }

    useEffect(() => {
        getTodoList();
    }, [refresh]);

    const handleLogout = async() => {
        logout()
    }

    return (
        <div>
            <h1 className={styles.title}>To-Do List</h1>
            <LogoutButton handleLogout={handleLogout}/>
            <SearchBar taskList={tasks} setResults={setTasks}></SearchBar>
            <AddTask onTaskAdded={getTodoList}></AddTask>
            <TodoList tasks={tasks} onTaskClick={(taskId)=> setSelectedTaskId(taskId)}></TodoList>
            {selectedTaskId && <ShowTask taskId={selectedTaskId} closeTask={()=>setSelectedTaskId(null)} refreshTask={refreshUpdatedTask} onDelete={deleteTask} ></ShowTask>}
        </div>
    );
};

export default TodoHome;