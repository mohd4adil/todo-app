const db = require('./dbConnection');

class AccountModel {

    async retrieveAccountDetails(userEmail) {
        try {
            const sql = 'SELECT * from account where user_email =$1';
            const params = [userEmail];
            const response = await db.query(sql, params);
            return response.rows[0];
        }
        catch(err) {
            console.error('Failed to retrieve the password hash from db')
        }
    }

    async checkExisting(userEmail) { //meant for checking during sign up if account already exists, can be negated to check during login if user does not exist
        try {
            const sql = 'SELECT * FROM ACCOUNT WHERE user_email=$1'
            const params = [userEmail]
            const response = await db.query(sql, params)
            return (response.rowCount === 1);
        }
        catch(err) {
            console.log('could not find if user exists')
        }
    }

    async createUser(userEmail, password) {
        try {
            const sql = 'INSERT INTO ACCOUNT (user_email, user_password) VALUES ($1, $2)'
            const params = [userEmail, password]
            const response = await db.query(sql, params)
            return response
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async createUserGoogle(userEmail) {
        try {
            const loginType = 'google'
            const sql = 'INSERT INTO ACCOUNT (user_email, login_type) VALUES ($1, $2)'
            const params = [userEmail, loginType]
            const response = await db.query(sql, params)
            return response
        }
        catch(err) {
            throw new Error(err)
        }
    }

    async addSession(sessionToken, userEmail) {
        try {
            const sql = "UPDATE account SET session_token = $1, session_status = 'active' where user_email=$2"
            const params = [sessionToken, userEmail]
            const response = await db.query(sql, params)
            return (response.rowCount > 0)
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);
        }
    }

    async revokeSession(userEmail) {
        try {
            const sql = "UPDATE account SET session_token = NULL, session_status = 'inactive' where user_email=$1"
            const params = [userEmail]
            const response = await db.query(sql, params)
            return (response.rowCount === 1)
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);
        }
    }

    async checkSession(sessionToken) {
        try {
            const sql = "SELECT user_email, session_status from account where session_token=$1"
            const params = [sessionToken]
            const response = await db.query(sql, params)
            return response.rows[0]
        }
        catch(err) {
            console.log('ERROR: ',err)
            throw new Error(err);
        }
    }

}

module.exports = new AccountModel();