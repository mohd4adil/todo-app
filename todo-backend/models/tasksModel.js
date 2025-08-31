const db = require('./dbConnection')

class taskModel {
    async createTask(sessionToken, taskName, taskDescription) {   
        try {
            const params = [taskName, taskDescription, sessionToken];
            const sql = `INSERT INTO tasks (user_email, task_name, task_description, status)
            SELECT user_email, $1, $2, 'To Do' FROM account WHERE session_token = $3
            RETURNING *
            `
            const response = await db.query(sql, params)
            console.log(response)
            if (response.rowCount > 0) {
                console.log('Successfully inserted the data')
                return response.rows[0]
            }
            else {
                console.log('insert failed')
                throw new Error('Failed to insert')
            }
        }
        catch(err) {
            console.error('Insert error: ', err)
            throw err;
        }
    }

    async editTask(sessionToken, taskName, taskDescription, status, task_id) {
        try {
            const params = [taskName, taskDescription, status, sessionToken, task_id];
            const sql = `UPDATE tasks 
            SET task_name = $1, task_description = $2, status = $3 
            WHERE task_id = $5 AND user_email IN (
                SELECT user_email 
                FROM account 
                WHERE session_token = $4
            )`;
            const response = await db.query(sql, params)
            if (response.rowCount > 0) {
                console.log('Successfully edited the task')
                return true
            }
            else {
                console.log('edit failed')
                throw new Error('Failed to edit')
            }
        }
        catch(err) {
            console.error('Insert error: ', err)
            throw err;
        }
    }

    async deleteTask(sessionToken, taskId) {
        try {
            const sql = 'DELETE FROM tasks where task_id = $1 and user_email IN (SELECT user_email from account where session_token = $2) '
            const params = [taskId, sessionToken]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows
            }
        }
        catch(err) {
            console.log('failed to delete task id: ', taskId)
            throw new Error('Failed to delete')
        }
    }

    async fetchTaskList(sessionToken) {
        try {
        const sql = 'SELECT tasks.* FROM tasks INNER JOIN account ON tasks.user_email = account.user_email where account.session_token=$1 ORDER BY task_id ASC'
        const params = [sessionToken]
        const response = await db.query(sql, params)
        if (response) {
            return response.rows
        }
        }
        catch(err) {
            console.log('error: ', err)
        }
    }
    async fetchTask(sessionToken, taskId) {
        try {
            const sql = 'SELECT t.task_name, t.task_description, t.status FROM tasks t INNER JOIN account a on t.user_email = a.user_email where t.task_id = $1 and a.session_token = $2 '
            const params = [taskId, sessionToken]
            const response = await db.query(sql, params)
            if (response) {
                return response.rows[0]
            }
            }
            catch(err) {
                console.log('error: ', err)
            }
    }
}

module.exports = new taskModel()