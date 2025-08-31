const accountModel = require('../models/accountModel')
const { decodeToken } = require('../services/sessionIssuer')

exports.checkStatus = async (req, res) => {
    if (req.cookies && (req.cookies.auth_token) ) {
        try {
            const decoded = await decodeToken(req.cookies.auth_token)
            if (decoded.type) {
                console.log(decoded)
                const checkSession = await accountModel.checkSession(req.cookies.auth_token)
                console.log(checkSession)
                if ( checkSession && checkSession.session_status == 'active' ) {
                    console.log('session is valid, proceeding')
                    return res.status(200).json({ isAuthenticated: true, user: { username: checkSession.user_email} })
                    }
                }
            return res.status(401).json({isAuthenticated: false})
        }
        catch(err) {
            console.log('Error: ', err)
            return res.status(400).json({isAuthenticated: false});
        }
    }
    else {
        console.log('user is not authenticated')
        return res.status(400).json({isAuthenticated: false});
    }
}