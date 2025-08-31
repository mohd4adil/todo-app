const { createSession } = require('../services/sessionIssuer')
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const compare = promisify(bcrypt.compare);
const accountModel = require('../models/accountModel');
const config = require('../config/config')
const { loginTypes } = require('../constants/constants.js')



exports.loginUser = async(req,res) => {
    console.log(`Request body:`, req.body);

    switch(req.body.type) {
        case loginTypes.normal :
            if (req.body.password.isEmpty || req.body.username.isEmpty) {
                res.status(400).json({ message: "Bad Request: Missing username or password" });
            } else {

                const username = req.body.username;
                const password = req.body.password;
                const genericErrorMessage = "Incorrect username or password"
                try {
                    const user = await accountModel.retrieveAccountDetails(username)
                    if (user) {
                        const { user_password } = user;
                        try {
                            const result = await compare(password, user_password);
                            if (result) {
                                try {
                                const token = await createSession(username, req.body.type) // this should be for if he exists and this a login, if he does exist and this is a signup, it should fail
                                res.cookie('auth_token', token, {
                                    httpOnly: true, 
                                    secure: false,
                                    sameSite: 'lax',
                                    maxAge: 8 * 60 * 60 * 1000,
                                } )
                                console.log('created session')
                                const isSessionUpdated = await accountModel.addSession(token, username)
                                if (isSessionUpdated) return res.redirect(200, config.homePage)
                                return res.redirect(200, config.loginPage)

                            }
                            catch (err) {
                                console.log(err)
                            }
                            }
                            else {
                                res.status(401).json({ message: genericErrorMessage })
                            }
                            }
                        catch(error) {

                            console.log("Error during password verification", error)
                            res.status(500).json({
                                message: genericErrorMessage
                            })
                        }}
                    else {
                        console.log("user does not exist")
                        res.status(401).json({
                            message: genericErrorMessage
                        })
                    }}
                catch(err) {
                    console.error('Could not verify details')
                }
            }
        break;
        
        case loginTypes.googleLogin:
            res.status(200).json({redirectUrl: config.googleLoginPage})
            break;
}
}
