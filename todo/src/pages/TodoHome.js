import React, { useState, useEffect, use } from 'react';
import { useAuth } from '../context/AuthContext';
import AddTask from '../components/AddTask';
import SearchBar from '../components/SearchBar';
import TodoList from '../components/TodoList';
import ShowTask from '../components/Task.backup.js';
import styles from './TodoHome.module.css'
import LogoutButton from '../components/LogoutButton';
import * as api from '../services/apiService.js'
import { useApi } from '../hooks/useApi.js';
import { FadeLoader } from 'react-spinners';
import DeleteBox from '../components/DeleteAlert.js'

const TodoHome = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const { logout } = useAuth();

    const { data: fetchedTasks, isLoading, request: getTodoList } = useApi(api.getTodoList)
    const { request: deleteTask } = useApi(api.deleteTask)  

    // const getTodoList = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/api/gettodolist')
    //         if (response.status === 200 && response.data.taskList) {
    //             console.log('Received all the tasks, here they are: ', response.data.taskList);
    //             if (Array.isArray(response.data.taskList) && response.data.taskList.length > 0) setTasks(response.data.taskList) 
    //         }
    //     } catch (err) {
    //         console.log('error: ', err);
    //         throw new Error(err);
    //     }
    // }

    // const getTodoList = async() => {
    //     const { data: taskDetails, request } = useApi(api.getTodoList())

    //     useEffect( () => {
    //         request()
    //     }, [request])
    //     setTasks(taskDetails)
    // }
    
    // const refreshUpdatedTask = async(taskId) => {
    //     console.log('refreshing mentioned task with taskId', taskId)
    //     setRefresh(taskId)
    // }

    // const deleteTask = async() => {
    //     console.log('attempting to delete this task ', selectedTaskId)
    //     // try {
    //     //     const response = await axios.delete('http://localhost:5000/api/deletetask', {
    //     //         params: {
    //     //             taskId: selectedTaskId
    //     //         },
    //     //         withCredentials: true
    //     //     });
    //     //     console.log(`response`)
    //     //     if(response.status === 204) {
    //     //         console.log('successully deleted this task')   
    //     //         setTasks(currentTasks => currentTasks.filter(task => task.task_id !== selectedTaskId))
    //     //         setSelectedTaskId(null)
    //     //     }
    //     // }
    //     // catch(e) {
    //     //     console.log('failed to delete the task: ', e)
    //     // }

    //     const { data , error, request } = useApi(api.deleteTask())
    //     useEffect( (taskId) => {
    //         request(taskId)
    //     }, [taskId])

    //     if (data) {
    //         setTasks(currentTasks => currentTasks.filter( task => task.task_id !== selectedTaskId ))
    //         setSelectedTaskId(null)
    //     }
    //     if (error) {
    //         console.log('error deleting task: ', error)
    //     }
    // }

    const deleteSelectedTask = async () => {
        try {
            await deleteTask(selectedTaskId)
            setTasks( currentTasks => currentTasks.filter( task => task.task_id !== selectedTaskId))
            setSelectedTaskId(null)
        }
        catch(e) {
            console.log('failed to delete')
        }
    }


    useEffect(() => {
        getTodoList();
    }, []);

    useEffect(()=> {
        console.log('running on mount')
        if(fetchedTasks && fetchedTasks.taskList) {
            console.log('found tasks')
            setTasks(fetchedTasks.taskList)
        }
    }, [fetchedTasks])

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <h1 className={styles.title}>To-Do List</h1>
            <LogoutButton handleLogout={handleLogout}/>
            <SearchBar taskList={tasks} setResults={setTasks}></SearchBar>
            <AddTask onTaskAdded={getTodoList}></AddTask>
            <TodoList tasks={tasks} isLoading={isLoading} onTaskClick={(taskId)=> setSelectedTaskId(taskId)}></TodoList>
            {selectedTaskId && <ShowTask taskId={selectedTaskId} closeTask={()=>setSelectedTaskId(null)} refreshTask={getTodoList} onDelete={()=> {
                console.log('delete clicked')
                setDeleteModal(true)
            }} ></ShowTask>}
            {deleteModal && <DeleteBox deleteTask={deleteSelectedTask} onClose={() => setDeleteModal(false)}/>}
            <div className={styles.loader}>
               {isLoading && <FadeLoader color="#6C63FF" />}
            </div>
        </div>
    );
};

export default TodoHome;