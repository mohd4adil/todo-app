const crypto = require('crypto')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const AccountModel = require('../models/accountModel')
const { createSession } = require('../services/sessionIssuer')
const config = require('../config/config')

class googleAuth {

    constructor() {
        this.clientId = process.env.CLIENT_ID
        this.clientSecret = process.env.CLIENT_SECRET
        this.redirectUri = config.callbackUrl
        this.googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
        this.googleTokenUrl = 'https://oauth2.googleapis.com/token'
        this.state = crypto.randomBytes(20).toString('hex')
        this.auth = ''
        this.userInfoEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo'
        this.loginType = 'google'

        const fetchUserInfoEndpoint = async() => {
            try {   
                const response = await axios.get('https://accounts.google.com/.well-known/openid-configuration')
                this.userInfoEndpoint = response.data.userinfo_endpoint;

            }
            catch(err) {
                console.log('unable to fetch user info endpoint')
            }
        }

        fetchUserInfoEndpoint()

    }

    async googleLogin(req, res) {
        const from = req.query?.from
        this.auth = from
        const queryString = `?client_id=${this.clientId}&redirect_uri=http://localhost:5000/api/auth/google/callback&response_type=code&scope=openid email profile&state=${this.state}`
        res.redirect(302, `${this.googleAuthUrl}${queryString}`)
    }

    async validateIdToken(idToken) {
        const {iss, aud, exp} = jwt.decode(idToken)
        return ((iss === 'https://accounts.google.com') && (aud === this.clientId) && (exp * 1000 >= Date.now()) )
    }

    async googleCallback(req, res) { // handling both sign up and login with the auth variable
        const state = req.query.state
        if (this.state != state) {
            return res.status(500).json({'Error' : 'Unable to login via Google'});
        }
        const queryString = `?code=${req.query.code}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=http://localhost:5000/api/auth/google/callback&grant_type=authorization_code`
        try {
            const response = await axios.post(`${this.googleTokenUrl}${queryString}`)
            const { id_token, access_token } = response.data
            const isValid = this.validateIdToken(id_token)
            if (!isValid) {
                console.log('token is not valid')
                return res.status(500).json({message: 'Error during login'})
            }
            console.log(this.userInfoEndpoint)
            const userInfo = await axios.get(this.userInfoEndpoint, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }); 
            const { name, email } = userInfo.data;

            const isExists = await AccountModel.checkExisting(email) // have to add a check to see if login or signup to choose either to create an account in case of sign up or to fail the login attempt in case that the account does not exist during login
            if (!isExists && this.auth === 'login') {
                return res.redirect(`${config.loginPage}?type=fail&message=Account does not exist`)
            }
            if (!isExists && this.auth === 'signup') {
                //have to create user and then redirect to login page
                try {  
                    const result = await AccountModel.createUserGoogle(email)
                    if (result.rowCount > 0) {
                        console.log('Created user in account table');
                        return res.redirect(302, `${config.loginPage}?type=success&message=Account created successfully`);
                    }
                    else {
                        console.log('failed to create user')
                        return res.redirect(`${config.loginPage}?type=fail&message=Unexpected error during login, try again later`)
                    }
                }
                catch(err) {
                    return res.redirect(`${config.loginPage}?type=fail&message=Failed to login with google, try again later`)
                }
            }
            if (isExists && this.auth === 'signup') {
                return res.redirect(`${config.loginPage}?type=fail&message=User already exists`)
            }
            const token = await createSession(email, 'google', name)
            await AccountModel.addSession(token, email)

            res.cookie('auth_token', token, {
                httpOnly: true, 
                secure: false,
                sameSite: 'lax',
                maxAge: 8 * 60 * 60 * 1000,
            } )

            return res.redirect(config.homePage)
            }
        catch(err) {
            console.log('ERRRORRR: ', err)
            res.status(500).json({message: 'Could not login via Google'})

        }
    }

}

module.exports = new googleAuth();