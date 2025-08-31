const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./middleware/logger')
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes')
const cookieParser = require('cookie-parser');
const database = require('./models/dbConnection')
const middlewareAuth = require('./middleware/authenticator')

dotenv.config()

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', // Or your frontend's actual URL
    credentials: true
};
// Middleware Order Matters!
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies BEFORE routes
app.use(cookieParser())
app.use(logger); // Apply logger after parsing, before routes or depending on need
app.use(middlewareAuth)

// Routes
app.use('/api',authRoutes);
app.use('/api',todoRoutes);


// app.use(logger); // Original position - moved up
// app.use(express.json()); // Original position - moved up
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await database.connect()
        console.log('The database is connected successfully');
        app.listen(PORT, () =>{
            console.log('The server has been started')
        })
    }
    catch(err) {
        console.error('Could not start server cuz of database');
        process.exit(1);
    }
}

startServer();