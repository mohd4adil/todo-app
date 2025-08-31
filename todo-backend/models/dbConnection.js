const { Client } = require('pg')
const config = require('../config/config')


class DbConnection {

    constructor(config) {
        this.client = new Client(config.databaseConfig);
        this.isConnected = false
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("connected to the db successfully");
            this.isConnected = true
        }
        catch(err) {
            console.error('Failed to connect to the database');
            throw err;
        };

    }

    async close() {
        if(!this.isConnected) return;
        await this.client.end()
        console.log('DB Connection has been closed')
        this.isConnected = false;
    }

    async query(text, params = []) {
        if(!this.isConnected) {
            throw new Error('DB connection has not been established');
        }
        return this.client.query(text, params);
    }

}

module.exports = new DbConnection(config);