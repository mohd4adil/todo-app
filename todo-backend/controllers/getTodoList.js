const taskModel = require('../models/tasksModel')

exports.fetchAllTasks = async(req, res) => {
    try {
        console.log('Attempting to fetch the tasks')
        const response = await taskModel.fetchTaskList(req.cookies.auth_token)
        console.log('back here with the response: ', response)
        if (response && Array.isArray(response) && response.length == 0) {
            console.log('empty task list')
            return res.status(200).json({taskList: []})
        }
        return res.status(200).json({taskList: response})
    }
    catch(err) {
        console.log('error while fetching tasks from controller: ', err)
        return res.status(500).json({'Error': 'sInternal server error'});
    }
}

exports.fetchTask = async(req, res) => {
    try {
        console.log('Attempting to fetch task with task id: ', req.query.taskId)
        const response = await taskModel.fetchTask(req.cookies.auth_token,req.query.taskId)
        if (response) {
            console.log(response)
            console.log('FETCHEDDD!')
            return res.status(200).json({taskDetails: response})
        }
        // If the response is null or undefined (task not found), send a 404
        return res.status(404).json({ taskDetails: response });
    }
    catch(err) {
        console.error("Error in fetchTask:", err); // Log the actual error
        return res.status(500).json({ message: 'Internal Server Error' }); // Send a proper error response
    }
}