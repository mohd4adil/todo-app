const accountModel = require('../models/accountModel') 

exports.logout = async(req, res) => {
    if (!req.cookies.auth_token) return res.status(400).json({message: 'User is not authenticated'})
    try { 
        const userDetails = await accountModel.checkSession(req.cookies.auth_token)
        const { user_email, session_status } = userDetails
        console.log(`userEmail: ${user_email}, session status: ${session_status}`)
        if (session_status === 'active') {
            console.log('user session is active, revoking')
            const revokeSession = await accountModel.revokeSession(user_email)
            if (revokeSession) {
                res.clearCookie('auth_token', {
                    httpOnly: true, 
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 8 * 60 * 60 * 1000,
                })
                return res.status(200).json({message: 'Logged out successfully'})
            }
        }
    }
    catch(e) {
        console.log('could not log out')
        return res.status(500).json({message: 'could not log out, try later'})
    }
}

