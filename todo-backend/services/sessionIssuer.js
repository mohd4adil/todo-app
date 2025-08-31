const jwt = require('jsonwebtoken')
const config = require('../config/config')

const createSession = async(userEmail, type = 'normal', username = 'user') => {
    return jwt.sign(
        {
            username: username,
            email: userEmail,
            type: type
        },
        config.jwtSecret,
        {
            expiresIn: '8h'
        }
    );
}

const verifySession = async(jwtToken) => {
    try {
    const decoded = jwt.verify(jwtToken, config.jwtSecret)
    if(decoded.exp * 1000 > Date.now()){
        throw new Error('Session expired')
    }
    return ({valid: true})
    }
    catch(err) {
        return({
            valid: false,
            error: err
        })
    }

}

const decodeToken = async(jwtToken) => {
    try {
        const decoded = jwt.verify(jwtToken, config.jwtSecret)
        return decoded
    }
    catch(err) {
        return null
    }

}

module.exports = { createSession, verifySession, decodeToken }