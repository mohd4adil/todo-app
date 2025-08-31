import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const [path, setPath] = useState('')

    useEffect(() => {
        console.log('using effect')
        const checkLogin = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/checkLogin', {}, {
                    withCredentials: true
                }); 
                console.log(response.data.user.username)
                setUser(response.data.user.username);
                navigate('/')
            }
            catch (err) {
                console.log('failed initial check')
                setUser(null)
            }
            finally {
                setIsLoading(false)
            }
        }
        checkLogin()
    },[]);

    const googleLogin = async() => {
        setError('');
        setIsLoading(true)
        try {
            console.log('launching request to backend')
            const response = await axios.post('http://localhost:5000/api/login', {
                type: 'googleLogin'
            }, {
                withCredentials: true
            })
            console.log(response)
            if (response) {
                const redirectUrl = response.data.redirectUrl
                window.location.href = `${redirectUrl}?from=login`
            }
            else {
                console.log('could not redirect')
            }
        }
        catch(err) {
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message)
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error during login')
            }
        }
        finally {
            setIsLoading(false)
        }
        // window.location.href = 'http://localhost:5000/api/auth/google?from=login' //should be routed to /login backend and then rerouted from there to google's auth
    }
    const login = async (email, password, fromPath) => { //have to change normal login to issue session
        setError('');
        setIsLoading(true);
        try {
            console.log('sending axios request')
            const response = await axios.post('http://localhost:5000/api/login', {
                username: email,
                password: password,
                type: 'normal'
            },{
            withCredentials: true
            });
            console.log('finished axios request')
            console.log(JSON.stringify(response))
            if (response.status === 200) {
                console.log("successfully logged in");
                setUser({username: email});
                navigate('/')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
            setUser(null)
        }
        finally {
            setIsLoading(false);
        }
    }

    const signUp = async (email, password) => {
        setError('');
        setPath('/signup')
        setIsLoading(true);
        try {
            console.log('sending axios request')
            const response = await axios.post('http://localhost:5000/api/signup', {
                type: 'normal',
                username: email,
                password: password
            },{
            withCredentials: true
            });
            if (response.status === 201) {
                console.log("successfully created user");
                navigate('/login')
            }
            else {
                console.log('Failed to create user')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const googleSignUp = async () => {
        setError('');
        setPath('/signup')
        setIsLoading(true);
        try {
            console.log('sending axios request')
            const response = await axios.post('http://localhost:5000/api/signup', {
                type: 'googleSignUp'
            },{
            withCredentials: true
            });
            if (response) {
                const redirectUrl = response.data.redirectUrl
                window.location.href = `${redirectUrl}?from=signup`
            }
            else {
                console.log('did not receive instructions to redirect url')
            }
        }
        catch(err) {
            console.log('Faced Error', err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError('Unexpected error occurred during login')
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/logout', {}, {
                withCredentials: true
            })
            if (response.status === 200) {
                console.log(response.data.message)
                setUser(null)
                navigate('/login')

            }
        }
        catch(e) {
            console.log('Faced an error trying to log out: ', e)
        }   

    };

    const values = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        googleLogin,
        signUp,
        path,
        googleSignUp
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within Auth Provider') 
    }
    return context;
}