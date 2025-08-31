const express = require('express');
const router = express.Router();
const { fetchAllTasks } = require('../controllers/getTodoList.js')
const { creatingTask, editTask, deleteTask } = require('../controllers/crudTasks.js')
const { fetchTask } = require('../controllers/getTodoList.js')

router.get('/gettodolist', fetchAllTasks);
router.get('/tasks', fetchTask)
router.post('/addtask', creatingTask)
router.patch('/edittask', editTask)
router.delete('/deletetask', deleteTask)


module.exports = router;
