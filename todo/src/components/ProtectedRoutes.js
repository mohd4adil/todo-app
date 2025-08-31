import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
        const {isAuthenticated, isLoading} = useAuth();
        const location = useLocation;

        if (isLoading) {
            return <div><h1>Loading...</h1></div>
        }

        if (!isAuthenticated) {
            console.log("Came here");
            return <Navigate to="/login" state={{ from: location.pathname }} replace />
        }
        return children;
}

export default ProtectedRoute;