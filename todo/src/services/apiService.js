import { apiClient } from "../lib/api";

export const addTask = (taskName, taskDescription) => apiClient.post('addtask', {
    taskName: taskName,
    taskDescription: taskDescription
})

export const editTask = (taskId, taskName, taskDescription, taskStatus) => apiClient.patch('edittask', {
    taskId: taskId,
    taskName: taskName,
    taskDescription: taskDescription,
    taskStatus: taskStatus
})

export const deleteTask = (taskId) => apiClient.delete('deletetask', {
    params: {
        taskId: taskId
    }
})

export const getTask = (taskId) => apiClient.get('/tasks', {
    params: {
        taskId: taskId
    }
})

export const getTodoList = () => apiClient.get('/gettodolist')