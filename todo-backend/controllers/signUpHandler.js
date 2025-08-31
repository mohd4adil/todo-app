const bcrypt = require('bcrypt');
const config = require('../config/config')
const accountModel = require('../models/accountModel');
const { signUpTypes } = require('../constants/constants.js')



exports.signUp = async(req,res) => {

    console.log(`Request body:`, req.body);
    console.log(`Request type: ${req.body.type}`)
    if (!req.body.type) return res.status(400).json({message: 'Invalid request'})
        switch(req.body.type) {
            case signUpTypes.normal :
                console.log('normal')
                if (!req.body.password || !req.body.username) {
                    return res.status(400).json({ message: "Bad Request: Missing username or password" });
                }
                const username = req.body.username;
                const password = req.body.password;
                const genericErrorMessage = "Incorrect username or password"
                try {
                    const hashedPassword = await bcrypt.hash(password, config.password.saltRounds)
                    const userExists = await accountModel.checkExisting(username)
                    if (userExists) {
                        return res.status(500).json({message: 'User already exists'})
                    }
                    else {
                    const response = await accountModel.createUser(username, hashedPassword, req.body.type)
                        if (response.rowCount > 0) {
                            return res.status(201).json({message: 'User has been created', username: username})
                        }
                        else {
                            return res.status(500).json({message: 'Failed to create user', username: username})
                        }
                }}
                catch(err) {
                    throw new Error(genericErrorMessage)
                }
            break;
            case signUpTypes.googleSignUp :
                console.log('google sign up')
                return res.status(200).json({redirectUrl: config.googleLoginPage})
                break;
            default: console.log('Invalid request type')
            console.log(signUpTypes.googleSignUp)
            console.log(req.body.type)
                     break;
}

}
