const taskModel = require('../models/tasksModel')

exports.creatingTask = async(req, res) => {
    try {
        console.log('Received request: ', req.body)

        if (!req.body.taskName || !req.body.taskDescription) {
            return res.status(400).json({
                message: 'Task name and description are required'
            });
        }

        const response = await taskModel.createTask(req.cookies.auth_token, req.body.taskName, req.body.taskDescription)
        console.log(JSON.stringify(response))
        if (response) {
            console.log('successfully entered the new records')
             return res.status(201).json({
                message: 'Successfully added the task',
                task: response
        })
        }
    }
    catch(err) {
        console.log('Faced an error here: ', err)
        return res.status(500).json({message: 'Some internal issue, please try again later'})
    }
}

exports.editTask = async(req, res) => {
    try {
        console.log('editing task...')
        if (!req.body.taskId || !req.body.taskName|| !req.body.taskDescription || !req.body.status) return res.status(400).json({message: 'Request body is invalid'})
        console.log(req.body)
        const response = await taskModel.editTask(req.cookies.auth_token, req.body.taskName, req.body.taskDescription, req.body.status, req.body.taskId)
        if (response) {
            console.log(response)
            return res.status(201).json({message: 'Updated successfully', taskName: req.body.taskName, taskDescription: req.body.taskDescription, status: req.body.status})
        }

    }
    catch(err) {
        console.log('Error here', err)
        return res.status(400).json({message: 'Failed to edit task'})
    }
}

exports.deleteTask = async(req, res) => {
    try {
        console.log('deleting task...', req.query.taskId)
        if (!req.query.taskId ) return res.status(400).json({message: 'Query params is missing'})
  
        const response = await taskModel.deleteTask(req.cookies.auth_token, req.query.taskId)
        if (response && Array.isArray(response) && response.length === 0) {
            console.log(response)
            console.log('successfully deleted!')
            return res.sendStatus(204)
        }
        console.log('failed to return after deleting task')
    }
    catch(err) {
        console.log('Error here', err)
        return res.status(400).json({message: 'Failed to edit task'})
    }
}